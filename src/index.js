const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

var locations = require('mastercard-locations');
const port = 8080;
const server = app.listen(port, () => {/**
  *
  * Script-Name: atm_locations
  * "[Im economist, yet]..here is how I want you to think about the economy."
  */

  var MasterCardAPI = locations.MasterCardAPI;

  var consumerKey = process.env.MASTERCARD_CONSUMER_KEY;   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
  var keyStorePath = process.env.MASTERCARD_P12_BINARY; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
  var keyAlias = "Passwordalias";//"keyalias";   // For production: change this to the key alias you chose when you created your production key
  var keyPassword = "Passwordalias";//"keystorepassword";   // For production: change this to the key alias you chose when you created your production key

  // You only need to do initialize MasterCardAPI once
  //
  var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
  MasterCardAPI.init({
    sandbox: true,
    debug: true,
    authentication: authentication
  });


  var requestData = {
    "PageOffset": "0",
    "PageLength": "5",
    "PostalCode": "11101"
  };
  locations.ATMLocations.query(requestData
    , function (error, data) {
      if (error) {
        err("HttpStatus: " + error.getHttpStatus());
        err("Message: " + error.getMessage());
        err("ReasonCode: " + error.getReasonCode());
        err("Source: " + error.getSource());
        err(error);

      }
      else {
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
          outObj(item, "Location")
          outObj(item, "HandicapAccessible")
          outObj(item, "Camera")
          outObj(item, "Availability")
          outObj(item, "AccessFees")
          outObj(item, "Owner")
          outObj(item, "SharedDeposit")
          outObj(item, "SurchargeFreeAlliance")
          outObj(item, "SurchargeFreeAllianceNetwork")
          outObj(item, "Sponsor")
          outObj(item, "SupportEMV")
          outObj(item, "InternationalMaestroAccepted")
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
  console.log('listening on port %s.\n', server.address().port);
});

module.exports = app;
