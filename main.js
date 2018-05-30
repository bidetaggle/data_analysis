var bigXml = require('big-xml');

//var reader = bigXml.createReader('dblp.xml', /^(article|phdthesis|mastersthesis)$/, { gzip: false });
var reader = bigXml.createReader('dblp.xml', /^(article|proceedings|inproceedings|incollection|book|phdthesis|mastersthesis|www)$/, { gzip: false });

var count = [];

var i = 0;
reader.on('record', function(record) {
    //var recordYear = parseInt(record.attrs.mdate.substring(0,4));
    //var recordYear = parseInt(record.year.value);
    var recordYear;
    var currentData;
    record.children.forEach(function(i,n){
        currentData = i;
        if(i.tag == "year"){
            recordYear = parseInt(i.text);
        }
    });

    if(recordYear == undefined){
        console.log(currentData);
    }
  var foundYear = count.find(function(e){
  	return e.year == recordYear
  });

  let n;
  if(foundYear == undefined){
  	n = 1;
  	count.push({year: recordYear, n:1});
  }
  else{
  	foundYear.n++;
  	n = foundYear.n;
  }

  console.log(`${recordYear} -> ${n}`);
});

reader.on('end', function(){
	console.log("The XML record is done :)");
	console.log(count);
    console.log("sorted by year :)");
    count.sort(function(e1, e2){
        const date1 = e1.year;
        const date2 = e2.year;
        return date1 - date2;
    });
    console.log(count);

});
