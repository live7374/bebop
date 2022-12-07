var https = require('follow-redirects').https;
var fs = require('fs');

let postText = "I have never been to London, Rome, «Paris»"
var options = {
  'method': 'POST',
  'hostname': 'script.google.com',
  'path': '/macros/s/AKfycbxaVydkWWHjyytFU3Tlomsb1_VjTZJQYq57u0iBXLOokMDsJr_KSqldRFbOyVQzv2ka/exec',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var receivedPost = JSON.parse(body.toString());
    var translatedPost = receivedPost.data[translated]
    var newPost = translatedPost
    // var splitPost = receivedPost.map(x => ({
    //     original: x.original,
    //     translated: x.translated,
    //     message: x.message,
    // }));

    console.log(newPost);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "data": [
    {
      "original": `${postText}`
    }
  ],
  "from": "EN",
  "to": "UK"
});

req.write(postData);

req.end();
