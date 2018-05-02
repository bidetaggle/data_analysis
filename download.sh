#!/bin/bash

curl http://dblp.uni-trier.de/xml/dblp.xml.gz > dblp.xml.gz

zcat dblp.xml.gz > dblp.xml