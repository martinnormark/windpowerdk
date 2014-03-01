/*
 * windmill-location-parser
 * https://github.com/martinnormark/windpowerdk
 *
 * Copyright (c) 2014 Martin H. Normark
 * Licensed under the MIT license.
 */

'use strict';

var excelParser = require('excel-parser');

exports.parseSpreadsheet = function (spreadsheetFilePath, outputPath) {
	excelParser.parse({
		inFile: spreadsheetFilePath,
		worksheet: 1,
		skipEmpty: false
	},function (err, records) {
		if (err) console.error(err);

		console.log(records);		
	});
};