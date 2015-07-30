var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs')
var upload = multer()
var inMemStream = {};
router.get('/', function(req, res) {
  //read from Mongo into inMemStream and stream the file.
  res.writeHead(200, {
    'Content-Type': inMemStream.mimetype,
    'Content-Length': inMemStream.size,
    'Content-disposition': 'attachment; filename=' + inMemStream.fileName
  });
  res.write(inMemStream.buffer);
  res.end();
});

router.post('/', upload.single('resumeFile'), function(req, res) {
  console.log('Uploaded File Details are Here', req.file);
  inMemStream = {
      mimetype: req.file.mimetype,
      size: req.file.size,
      fileName: req.file.originalname,
      buffer: req.file.buffer
    } // Save this to Mongo
  res.status(200).send('Uploaded Succesfully');

});

module.exports = router;
