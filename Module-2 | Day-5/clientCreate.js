var Request = require("request");
const express = require('express');
const app = express();

app.use(express.json());

app.get('/:companyname/:country/:timezone', (req,res) => {

   

   const companyname = req.params.companyname;
   const country = req.params.country;
   const timezone = req.params.timezone;
    
   Request.post({
    "headers": { "content-type": "application/json", "Authorization":"Basic YWIzMDczNDYxMTY5YmU0ODJjNGJlYzY0OGMzYzJlMjc6" },
    "url": "https://api.createsend.com/api/v3.2/clients.json"
    "body": JSON.stringify({
        "CompanyName": companyname,
        "Country": country,
        "TimeZone":timezone
  
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }    
    else
        res.send(body);
    // console.dir(JSON.parse(body));
});

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
