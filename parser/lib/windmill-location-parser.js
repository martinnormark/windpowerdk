/*
 * windmill-location-parser
 * https://github.com/martinnormark/windpowerdk
 *
 * Copyright (c) 2014 Martin H. Normark
 * Licensed under the MIT license.
 */

'use strict';

var config = require('../config'),
	excelParser = require('excel-parser'),
	utmConverter = require('./utmconverter');

function precise_round(num,decimals){
	return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
}

exports.parseSpreadsheet = function (spreadsheetFilePath, outputPath, callback) {
	excelParser.parse({
		inFile: spreadsheetFilePath,
		worksheet: 1,
		skipEmpty: false
	},function (err, records) {
		if (err) console.error(err);

		var geoJson = {
			type: 'FeatureCollection',
  			features: []
  		};

		// UTM east: index14
		// UTM north: index15
		for (var i = 0; i < records.length; i++) {
			var row = records[i],
				latLong = utmConverter.toLatLong(row[15], row[14], config.utmZone);

			if (latLong && latLong.lat && latLong.lon) {
				var feature = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [precise_round(latLong.lon, 7), precise_round(latLong.lat, 7)]
					},
					properties: {}
				};

				geoJson.features.push(feature);
			};
		};

		if (callback) {
			callback(geoJson);
		};
	});
};