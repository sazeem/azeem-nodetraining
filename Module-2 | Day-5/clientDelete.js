var Request = require("request");
const express = require('express');
const app = express();

app.use(express.json());

app.get('/:clientId', (req,res) => {

   

   const clientId = req.params.clientId;
    
   Request.delete({
    "headers": { "content-type": "application/json", "Authorization":"Basic YWIzMDczNDYxMTY5YmU0ODJjNGJlYzY0OGMzYzJlMjc6" },
    "url": "https://api.createsend.com/api/v3.2/clients/"+clientId+".json"    
  
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }    
    else
        res.send("The Client With the ClientId: "+clientId+ " deleted");
    // console.dir(JSON.parse(body));
});

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
