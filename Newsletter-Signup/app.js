const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
 
const app = express();
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 
mailchimp.setConfig({
    apiKey: "e5669ca8875c5edec32b7d0acd83b584-us21",
    server: "us21",
});
 
 
app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});
 
app.post("/", (req,res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const listID = "a6ecff64c9";
    
    async function addMember() {
        const response = await mailchimp.lists.addListMember(listID, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }).then(
            (value) => {
                console.log("Successfully added contact as an audience member.");
                res.sendFile(__dirname + "/success.html");
            },
            (reason) => {
                res.sendFile(__dirname + "/failure.html");
            },
        );
    }
    addMember();
});
 
app.post("/failure", (req, res) => {
    res.redirect("/");
});
 
app.listen(3000);

// e5669ca8875c5edec32b7d0acd83b584-us21

// a6ecff64c9
