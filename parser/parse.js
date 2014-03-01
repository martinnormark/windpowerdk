/*
 * windmill-location-parser
 * https://github.com/martinnormark/windpowerdk
 *
 * Copyright (c) 2014 Martin H. Normark
 * Licensed under the MIT license.
 */

'use strict';

var config = require('./config'),
	http = require('http'),
	fs = require('fs'),
	spreadsheetFilePath = './data/windmillsdk.xls',
	parser = require('./lib/windmill-location-parser');

fs.exists(spreadsheetFilePath, function(exists) {
  if (!exists) {
  	console.log('Spreadsheet not present, downloading...');

	var outputFile = fs.createWriteStream(spreadsheetFilePath);

	var response = http.get(config.dataUrl, function (response) {
		response.pipe(outputFile);
	});
  }
});

// Parse the spreadsheet
parser.parseSpreadsheet(spreadsheetFilePath, config.outputPath, function (geoJson) {
	console.log(JSON.stringify(geoJson) || "nothing");
});