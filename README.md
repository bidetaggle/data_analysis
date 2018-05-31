# README #

### data ###

- dblp.xml - original data (download it with ./download.sh if you are under linux)
- extract.xml - shrinked data to make tests (extract from dblp.xml)
- record.json - record and computation of the data from dblp.xml
- report.pdf - report with ACM template

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

As a result, I get this dataset :

```record.json
[ { year: 1936, n: 12 },
  { year: 1937, n: 15 },
  { year: 1938, n: 11 },
  { year: 1939, n: 18 },
  { year: 1940, n: 10 },
  { year: 1941, n: 13 },
  { year: 1942, n: 13 },
  { year: 1943, n: 8 },
  { year: 1944, n: 5 },
  { year: 1945, n: 9 },
  { year: 1946, n: 31 },
  { year: 1947, n: 10 },
  { year: 1948, n: 16 },
  { year: 1949, n: 23 },
  { year: 1950, n: 24 },
  { year: 1951, n: 19 },
  { year: 1952, n: 34 },
  { year: 1953, n: 113 },
  { year: 1954, n: 168 },
  { year: 1955, n: 156 },
  { year: 1956, n: 224 },
  { year: 1957, n: 246 },
  { year: 1958, n: 275 },
  { year: 1959, n: 380 },
  { year: 1960, n: 421 },
  { year: 1961, n: 609 },
  { year: 1962, n: 798 },
  { year: 1963, n: 788 },
  { year: 1964, n: 767 },
  { year: 1965, n: 897 },
  { year: 1966, n: 978 },
  { year: 1967, n: 1175 },
  { year: 1968, n: 1327 },
  { year: 1969, n: 1331 },
  { year: 1970, n: 1576 },
  { year: 1971, n: 1976 },
  { year: 1972, n: 2399 },
  { year: 1973, n: 2555 },
  { year: 1974, n: 2656 },
  { year: 1975, n: 2891 },
  { year: 1976, n: 3090 },
  { year: 1977, n: 3526 },
  { year: 1978, n: 3577 },
  { year: 1979, n: 3771 },
  { year: 1980, n: 4364 },
  { year: 1981, n: 4747 },
  { year: 1982, n: 5374 },
  { year: 1983, n: 6059 },
  { year: 1984, n: 6865 },
  { year: 1985, n: 7522 },
  { year: 1986, n: 7939 },
  { year: 1987, n: 8812 },
  { year: 1988, n: 10001 },
  { year: 1989, n: 11076 },
  { year: 1990, n: 12303 },
  { year: 1991, n: 14237 },
  { year: 1992, n: 15837 },
  { year: 1993, n: 17706 },
  { year: 1994, n: 19354 },
  { year: 1995, n: 21151 },
  { year: 1996, n: 23303 },
  { year: 1997, n: 24580 },
  { year: 1998, n: 26472 },
  { year: 1999, n: 29760 },
  { year: 2000, n: 34088 },
  { year: 2001, n: 35490 },
  { year: 2002, n: 38114 },
  { year: 2003, n: 44303 },
  { year: 2004, n: 48790 },
  { year: 2005, n: 56969 },
  { year: 2006, n: 64330 },
  { year: 2007, n: 71934 },
  { year: 2008, n: 77661 },
  { year: 2009, n: 85570 },
  { year: 2010, n: 92540 },
  { year: 2011, n: 99572 },
  { year: 2012, n: 108540 },
  { year: 2013, n: 115768 },
  { year: 2014, n: 122713 },
  { year: 2015, n: 127607 },
  { year: 2016, n: 137248 },
  { year: 2017, n: 149683 },
  { year: 2018, n: 51530 },
  { year: undefined, n: 3 } ]
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

Read more on report.pdf
