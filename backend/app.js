var express = require('express'); 
var cors = require('cors');

var app = express(); 
var PORT = 3005; 

app.use(cors())

app.get('/download/*', function(req, res){ 
    const fname = req.originalUrl.split('/')[2]
	console.log(fname)
    // console.log(fname.split('/')[2])
    res.download(`models/${fname}`, function(error){ 
        console.log("Error : ", error) 
    }); 
}); 
   
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});
