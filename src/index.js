// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//'use strict';
// idToken comes from the client app
const args = process.argv.slice(2);
//https://github.com/googleapis/nodejs-secret-manager/blob/main/samples/getSecret.js
//async function main(name = 'projects/my-project/secrets/my-secret') {
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

//https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless#update_dns
//https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless
const express = require("express");


const { OAuth2Client } = require('google-auth-library');
const authClient = new OAuth2Client();
const app = express();
//var router = express.Router();get("/")
//https://stackoverflow.com/questions/19313016/catch-all-route-except-for-login
app.all("*", async (req, res) => {
  // Verify that the request originates from the application.
  //https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/783bb8a8f0b5ee7480bb991e3a89300a5eb36e84/appengine/pubsub/app.js#L94
  if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
    res.status(400).send('Invalid request');
    return;
  }

  // Verify that the push request originates from Cloud Pub/Sub.
  try {
    // Get the Cloud Pub/Sub-generated JWT in the "Authorization" header.

    // Verify and decode the JWT.
    // Note: For high volume push requests, it would save some network
    // overhead if you verify the tokens offline by decoding them using
    // Google's Public Cert; caching already seen tokens works best when
    // a large volume of messages have prompted a single push server to
    // handle them, in which case they would all share the same token for
    // a limited time window.
    const ticket = await authClient.verifyIdToken({
      idToken: req.header('Authorization').match(/Bearer (.*)/),
      audience: 'example.com',
    });

    const claim = ticket.getPayload();

    // IMPORTANT: you should validate claim details not covered
    // by signature and audience verification above, including:
    //   - Ensure that `claim.email` is equal to the expected service
    //     account set up in the push subscription settings.
    //   - Ensure that `claim.email_verified` is set to true.

    claims.push(claim);
  } catch (e) {
    res.status(400).send('Invalid token');
    return;
  }
  /*claims = google.oauth2.request.headers.Authorization.verify_firebase_token(
      id_token, HTTP_REQUEST, audience=os.environ.get('GOOGLE_CLOUD_PROJECT'))
  if not claims:
      return 'Unauthorized', 401*/

  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Content-Type", "Application/JSON");
  var origin = req.get("Origin");
  var allowedOrigins = [
    "https://www.yoursite.blah",
    "https://yoursite2.blah"
  ];
  if (allowedOrigins.indexOf(origin) > -1) {
    // Origin Allowed!!
    res.set("Access-Control-Allow-Origin", origin);
    if (req.method === "OPTIONS") {
      // Method accepted for next request
      res.set("Access-Control-Allow-Methods", "POST");
      //SEND or end
      return res.status(200).send({});
    } else {

      const getSecret = async (key) => {
        var accessResponse = null;
        try {
          accessResponse = await client.accessSecretVersion({ name: `projects/vaumoney/secrets/${key}/versions/latest` }); //versionname
        } catch (e) {
          return console.log(e);
        };
        if (!accessResponse) return console.log("no accessResponse");
        if (!accessResponse.payload) return console.log("no accessResponse payload");
        // Access the secret.https://stackoverflow.com/questions/61282732/cant-access-secret-in-gcp-secret-manager
        console.info(`Captured secret: ${accessResponse.payload}`);
        //https://cloud.google.com/secret-manager/docs/reference/libraries#client-libraries-install-nodejs
        return accessResponse.payload.data.toString("utf8");
      }
      const MASTERCARD_CONSUMER_KEY = await getSecret("MASTERCARD_CONSUMER_KEY")
      const MASTERCARD_P12_BINARY = await getSecret("MASTERCARD_P12_BINARY")
      res.send("Hello World!");
      var MasterCardAPI = locations.MasterCardAPI;

      //init once
      MasterCardAPI.init({
        sandbox: true,
        debug: true,
        authentication: new MasterCardAPI.OAuth(
          MASTERCARD_CONSUMER_KEY,/*process.env*///consumerKey, // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
          MASTERCARD_P12_BINARY,//keyStorePath,// e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
          "Passwordalias", //keyAlias,"keyalias";   // For production: change this to the key alias you chose when you created your production key
          "Passwordalias" //keyPassword,"keystorepassword";   // For production: change this to the key alias you chose when you created your production key
        )
      }); //"im speculating like everyone else is sometime we prove a negative search warrant"

      locations.ATMLocations.query({
        PageOffset: "0",
        PageLength: "5",
        PostalCode: "11101"
      }, function (error, data) {
        if (error) {
          err("HttpStatus: " + error.getHttpStatus());
          err("Message: " + error.getMessage());
          err("ReasonCode: " + error.getReasonCode());
          err("Source: " + error.getSource());
          err(error);
        } else {
          out(data.Atms.PageOffset); //-->0
          out(data.Atms.TotalCount); //-->26
          out(data.Atms.Atm[0].Location.Name); //-->Sandbox ATM Location 1
          out(data.Atms.Atm[0].Location.Distance); //-->0.93
          out(data.Atms.Atm[0].Location.DistanceUnit); //-->MILE
          out(data.Atms.Atm[0].Location.Address.Line1); //-->4201 Leverton Cove Road
          out(data.Atms.Atm[0].Location.Address.Line2); //-->
          out(data.Atms.Atm[0].Location.Address.City); //-->SPRINGFIELD
          out(data.Atms.Atm[0].Location.Address.PostalCode); //-->11101
          out(data.Atms.Atm[0].Location.Address.CountrySubdivision.Name); //-->UYQQQQ
          out(data.Atms.Atm[0].Location.Address.CountrySubdivision.Code); //-->QQ
          out(data.Atms.Atm[0].Location.Address.Country.Name); //-->UYQQQRR
          out(data.Atms.Atm[0].Location.Address.Country.Code); //-->UYQ
          out(data.Atms.Atm[0].Location.Point.Latitude); //-->38.76006576913497
          out(data.Atms.Atm[0].Location.Point.Longitude); //-->-90.74615107952418
          out(data.Atms.Atm[0].Location.LocationType.Type); //-->OTHER
          out(data.Atms.Atm[0].HandicapAccessible); //-->NO
          out(data.Atms.Atm[0].Camera); //-->NO
          out(data.Atms.Atm[0].Availability); //-->UNKNOWN
          out(data.Atms.Atm[0].AccessFees); //-->UNKNOWN
          out(data.Atms.Atm[0].Owner); //-->Sandbox ATM 1
          out(data.Atms.Atm[0].SharedDeposit); //-->NO
          out(data.Atms.Atm[0].SurchargeFreeAlliance); //-->NO
          out(data.Atms.Atm[0].SurchargeFreeAllianceNetwork); //-->DOES_NOT_PARTICIPATE_IN_SFA
          out(data.Atms.Atm[0].Sponsor); //-->Sandbox
          out(data.Atms.Atm[0].SupportEMV); //-->1
          out(data.Atms.Atm[0].InternationalMaestroAccepted); //-->1
          //This sample shows looping through Atms.Atm
          console.log("This sample shows looping through Atms.Atm");
          data.Atms.Atm.forEach(function (item) {
            outObj(item, "Location");
            outObj(item, "HandicapAccessible");
            outObj(item, "Camera");
            outObj(item, "Availability");
            outObj(item, "AccessFees");
            outObj(item, "Owner");
            outObj(item, "SharedDeposit");
            outObj(item, "SurchargeFreeAlliance");
            outObj(item, "SurchargeFreeAllianceNetwork");
            outObj(item, "Sponsor");
            outObj(item, "SupportEMV");
            outObj(item, "InternationalMaestroAccepted");
          });
        }
      });

      function out(value) {
        console.log(value);
      }

      function outObj(item, key) {
        console.log(item[key]);
      }

      function err(value) {
        console.error(value);
      }
    }
  }
}).on('error', (e) => {
  //https://expressjs.com/en/4x/api.html#req
  console.log(`Error route ${req.params} happened: `, e.message)
});;
//"[this could get complicated], oh yeah" kramer getting into media and politics
var locations = require("mastercard-locations");
const port = 8080;//https://cloud.google.com/run/docs/tutorials/identity-platform
//https://cloud.google.com/run/docs/troubleshooting#unauthorized-client
//roles/secretmanager.secretAccessor
//https://cloud.google.com/secret-manager/docs/access-control
//firebase-adminsdk-afvoy@vaumoney.iam.gserviceaccount.com	
const server = app.listen(port, () => {

  console.log("listening on port %s.\n", server.address().port);
}).on('error', (e) => {
  console.log('Error listen happened: ', e.message)
});

module.exports = app;
//prosecuted bully
//async function getSecret() {
//const [secret] = await
/*client.getSecret({
  name: args,
}).then(async s=>{
  const [secret] = await s;// destructuring still
});
const policy = secret.replication.replication;
console.info(`Found secret ${secret.name} (${policy})`);*/
//"global localized not centralized"
//"paraorganization"
//"if profits increase, the lie that [putin caused] it is 'Putins Prike hike' is simply a lie"
//}getSecret();// [END secretmanager_get_secret]}
//"[fund killer cops, don't vote] property rights"

//main(...args).catch(console.error);
//secret service roles logs
// chnge IP external static to load balance vm
  //secret
/*invid
const newpurpose = (func, sng) => {
  return {
    name: func().name,
  }[sng + "name"] "work foress implied or promised-given"
}*/
/**
 *
 * Script-Name: atm_locations
 * "[Im economist, yet]..here is how I want you to think about the economy."
 */
/*const secret = async () => client.getSecret({
  name: args
});
//const policy = secret.replication.replication;
//console.info(`Found secret ${secret.name} (${policy})`);
// Add a version with a payload onto the secret.
var version = async () => await client.addSecretVersion({
  parent: secret().name,
  payload: {
    data: Buffer.from(payload, 'utf8'),
  },
});
//"lazy selfish aabove"
version = newpurpose(version, "version")
console.info(`Captured secret version ${versionname.name}`);*/
