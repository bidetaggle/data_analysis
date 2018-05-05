var bigXml = require('big-xml');
    
var reader = bigXml.createReader('dblp.xml', /^(dblp)$/, { gzip: false });

var publicationTypes = [];

var output;
reader.on('record', function(record) {
  output = record.children;

  //console.log(output);

  for(var i=0 ; i<output.length ; i++ ){
  	let publicationTypesStored = publicationTypes.find(function(e){
	  	return e == output[i].tag;
	});
	
  	if(publicationTypesStored == undefined){
  		console.log("---"+output[i].tag);
  		publicationTypes.push(output[i].tag);
  		console.log(publicationTypes);
  	}
  }
});

reader.on('end', function(){
	console.log("The XML record is done :)");
	console.log(publicationTypes);
});