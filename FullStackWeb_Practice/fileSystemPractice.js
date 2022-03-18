var fs = require('fs')
fs.readFile("str.txt", "utf8", function(err, data){
  console.log(data);
});
