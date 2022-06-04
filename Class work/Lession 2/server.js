// require built-in modules
const http = require('http');
const fs = require('fs');

const port = 3000;

// when the server is instantiated (created) it is IMMUTABLE
const server = http.createServer(function(req, res)
{

    // reads a file from the file system
    fs.readFile(__dirname + req.url, function(err, data)
    {
        // some error exists with the url
        if(err)
        {
            res.writeHead(404); // file does not exist
            console.log(`ERROR: ${err.message}`);        
            return res.end("ERROR: 404");
        }
        // no error
        res.writeHead(200); // all ok
        console.log(`Full File Name: ${__filename}`);
       return res.end(data); // outputs the file to the browser
    });
});

server.listen(port, function()
{
    console.log("Server Running at Port: " + port);
});