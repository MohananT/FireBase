var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: "AKIA6EOZKG77ZEOST7XI",
  secretAccessKey: "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"
});

/* GET home page. */
router.get("/", function(req, res, next) {
  // Create DynamoDB document client
  let dynamoDb = new AWS.DynamoDB();

  let table = "MyIoTTable";

  let year = "1";
  let title = "1";

  // to get an item
  let params = {
    TableName: table,
    Key: {
      Row: { S: year },
      PositionInRow: { S: title }
    }
  };

  dynamoDb.getItem(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        res.send(JSON.stringify(err));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        res.send(JSON.stringify(data));
    }
  });

  
});

module.exports = router;
