var util = require('util');
var jsdom = require('jsdom');

module.exports.getForecast = function() {
  jsdom.env('http://www.rubhoz.com/ru/prognoz_kleva_taganrog#pike',
            ['http://code.jquery.com/jquery.js'],
            function (err, window) {
              // get forecast for today and next 4 days
              for (var i=0; i<5; i++) {
                var daySelector = util.format('#wd_%d .mbl-1 .name', i);
                var forecastValueSelector = util.format('#wd_%d .mbl-5 .klev span', i);



                console.log(window.$(daySelector).text() + '  ' + window.$(forecastValueSelector).text());
              }

            });
};
