const express = require('express')
const app = express();
var cors = require('cors')
const port = 3001;

var sf = require('node-salesforce');
// app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/login', (req,res)=>{

  var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://test.salesforce.com'
  });
  let username = 'duser@boston.gov.uat'
  let password = 'BPD4!-Dstuffy$617918';
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);





    var records = [];
      conn.query("select project__r.id, project__r.name, project__r.OwnerId, project__r.projectStatus__c, Parcel__r.ParcelId__c,  id from Project_Parcel__c", function(err, result) {
        if (err) { return console.error(err); }
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
        console.log("done ? : " + result.done);
        // if (result.done) {
          res.json(result)
          // you can use the locator to fetch next records set.
          // Connection#queryMore()
          // console.log("next records URL : " + result.nextRecordsUrl);
        // }
      });
    // ...
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//
// var sf = require('node-salesforce');
// var conn = new sf.Connection({
//   oauth2 : {
//     clientId : '3MVG9Z8h6Bxz0zc6SOt.3ag9YhIUUsOz6C5LNvHhJ6wiiTbVUTSn5Uh6mcUaz92GJqeDlCowhyAwhX5nD5nz5',
//     clientSecret : '941ED30163CB8CD38ADF7F8F1A86D04A86AE9B10A7754FBF07C515B43AE3B2FA',
//     redirectUri : "https://test.salesforce.com/services/oauth2/token"
//   },
//   instanceUrl : 'https://na1.salesforce.com',
//   accessToken : '<your Salesforrce OAuth2 access token is here>',
//   refreshToken : '<your Salesforce OAuth2 refresh token is here>'
// });
//
//
// conn.login(username, password, function(err, userInfo) {
//   if (err) { return console.error(err); }
//   // Now you can get the access token and instance URL information.
//   // Save them to establish connection next time.
//   console.log(conn.accessToken);
//   console.log(conn.instanceUrl);
//   // logged in user property
//   console.log("User ID: " + userInfo.id);
//   console.log("Org ID: " + userInfo.organizationId);
//   // ...
// });
