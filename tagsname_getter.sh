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