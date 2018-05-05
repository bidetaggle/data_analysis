### data ###

- dblp.xml - original data (download it with ./download.sh if you are under linux)
- extract.xml - shrinked data to make tests (extract from dblp.xml)
- record.json - record and computation of the data from dblp.xml

### code ###

main.js

### install & requirements ###

- node 10.0.0
- npm 6.0.0

```bash 
$ ./download.sh
$ npm install
$ node main.js
```

# Technical report #

## Methodology ##

### I) Genesis ###

The set of data is big (2.2G) and it's an XML file, a format which is more heavy to read than to store (because of the parsing process). Well, I tried to open it with a regular text edition tool and, as expected, my computer runned out of memory just trying to read the raw document. Further more, this format is higly deprecated and online help communities mostly suggest to use another format source... The obvious truth was finally set in my mind : this one is going to be tricky.

First of all, I checked how the file looks like by hand with the help of tail and head UNIX commands and I figured out that everything is wrapped into a `<dblp>` tag, and each child seems to be a publication with an mdate parameter. Among those children, I've seen the tags `<article>`, `<mastersthesis>` and `<phdthesis>`.
Here is the first lines of data :

```dblp.xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE dblp SYSTEM "dblp.dtd">
<dblp>
<article mdate="2017-05-28" key="journals/acta/Saxena96">
<author>Sanjeev Saxena</author>
<title>Parallel Integer Sorting and Simulation Amongst CRCW Models.</title>
<pages>607-619</pages>
<year>1996</year>
<volume>33</volume>
<journal>Acta Inf.</journal>
<number>7</number>
<url>db/journals/acta/acta33.html#Saxena96</url>
<ee>https://doi.org/10.1007/BF03036466</ee>
</article><article mdate="2017-05-28" key="journals/acta/Simon83">
<author>Hans Ulrich Simon</author>
<title>Pattern Matching in Trees and Nets.</title>
<pages>227-248</pages>
<year>1983</year>
<volume>20</volume>
<journal>Acta Inf.</journal>
<url>db/journals/acta/acta20.html#Simon83</url>
<ee>https://doi.org/10.1007/BF01257084</ee>
</article><article ...
...
...
```

After a few investigation, I decided to use javascript (nodejs) with big-xml library (https://www.npmjs.com/package/big-xml).
This library search a tag according to a regex request and release the memory once one is found, then keep going the research. Ok, then let's try it with this one : `/^(article|mastersthesis|phdthesis)$/` (main.js)

As a result, I get this dataset (sorted by year by hand) :

```record.json
[ 
  { year: 2002, n: 34916 },
  { year: 2003, n: 25888 },
  { year: 2004, n: 17412 },
  { year: 2005, n: 13725 },
  { year: 2006, n: 44991 },
  { year: 2007, n: 22441 },
  { year: 2008, n: 25540 },
  { year: 2009, n: 706780 }, 
  { year: 2010, n: 139223 },
  { year: 2011, n: 223930 },
  { year: 2012, n: 228722 },
  { year: 2013, n: 199180 },
  { year: 2014, n: 236344 },
  { year: 2015, n: 258654 },
  { year: 2016, n: 343312 },
  { year: 2017, n: 3401287 },
  { year: 2018, n: 304666 }
]
```

Cool, this looks nice for a first shot. Well, my instinct told me at this moment that it seems to be too easy, and there are not so much data to play with at final. There is probably more than 3 children tags (article, masterthesis, phdthesis) and I need to list it in order to feed my script through the regular expression.

### II) Hack the data file ###

My javascript works well to match some children of `<dblp>` so, let's have a try on `<dblp>` itself to figure out the name of each child only. I write a new code under the name of tagsname_getter.js, but I know something : big-xml library search for a tag, then read the whole content and give the fallback before releasing the memory and going to the next tag whitch match with the regular expression. Yet, `<dblp>` is the only one tag which wrap the entire file. I don't like to be pessimistic but, I think it won't make it.
After 5 minutes waiting for the program to give me an output, the smashing conclusion clearly appeared :

```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

*I need to hack this file (⌐▨_▨)*

I listed several ways to deal with this file :
- I split it in several files and I wrap each one with <dblp>, but it's very inaccurate and I'll probably spend lot of time on technical details
- I find something to put these data in a relational database, but it needs obviously an XML parser and I'll probably cope with the same memory issue
- I rent a powerful server to run my script, but it requires money and OS setup (at least to install node, ok it's easy but you never know!)
- I pray god but it only works in case of extrem emergency
- I grep it, it's a line by line reader, with regex possibility and without worry about memory managment x)

Without any surprise, I decided to pray god and grep it. I suddenly realized that I could just grep the mdate parameter to count the total of any publications per year (o_o). I already spent a good amount of time on my javascript, let's take advantage of it to accomplish a great job by having data sorted by type of publication (•̀ᴗ•́)و

This idea gave birth of this bash script below :

```tagsname_getter.sh
#!/bin/bash

DATA="dblp.xml"

echo "cutting the file $DATA..."

grep -o '<[a-z ]\+ mdate' $DATA | sed -e 's/<\([a-z]*\) mdate/\1/' > tagsname.txt

echo "tagsname.txt created. A list of unique tags name is processing, please wait..."
echo "(∩｀-´)⊃━☆ﾟ.*･｡ﾟ"

TAGS=()

#read line by line
while IFS='' read -r line || [[ -n "$line" ]] ; do
	#search in the TAGS array if the tagname is already recorded
	RECORDED=false
	for i in "${TAGS[@]}" ; do
		if [ $i == $line ] ; then
			#echo yes
			RECORDED=true
			break
		fi
	done
	if [ $RECORDED = false ] ; then
		echo $line
		TAGS+=($line)
	fi
	#echo "Text read from file: $line"
done < tagsname.txt

echo "Done (*‿*✿)"
```

with the following output :

```
article
proceedings
inproceedings
incollection
book
phdthesis
mastersthesis
www
```

＼\ ٩( ᐛ )و /／