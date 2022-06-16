// require built-in modules
const http = require('http');
const fs = require('fs');
const mime_type = require('mime-types');
const port = 3000;

let lookup = mime_type.lookup;

// when the server is instantiated (created) it is IMMUTABLE
const server = http.createServer(function(req, res)
{
    let path = req.url;

    if(path =="/" || path == "/home")
    {
        path = "/index.html"
    }
    let mime_type = lookup(path.substring(1));

    // reads a file from the file system
    fs.readFile(__dirname + path, function(err, data)
    {
        // some error exists with the url
        if(err)
        {
            res.writeHead(404); // file does not exist
            console.log(`ERROR: ${err.message}`);        
            return res.end("ERROR: 404");
        }
        // no error
        res.setHeader("X-Content-Type-Options","nosniff"); // security guard
        res.writeHead(200,{'Content-type': mime_type }); // all ok
        console.log(`Full File Name: ${__filename}`);
       return res.end(data); // outputs the file to the browser
    });
});

server.listen(port, function()
{
    console.log("Server Running at Port: " + port);
});