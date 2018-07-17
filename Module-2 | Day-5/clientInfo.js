var Request = require("request");
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req,res) => {


    Request.get({
        "headers": { "content-type": "application/json", "Authorization":"Basic YWIzMDczNDYxMTY5YmU0ODJjNGJlYzY0OGMzYzJlMjc6" },
        "url": "https://api.createsend.com/api/v3.1/clients/fd23317bd9f2be9f4d1911a6b9c4f7c1.json"
      
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        const myResp = JSON.parse(body);
        
        res.send(myResp);
        
        // console.dir(JSON.parse(body));
    });

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
