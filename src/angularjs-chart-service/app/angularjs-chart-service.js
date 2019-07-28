(function () {
    'use strict';

    var angularJSChartService = window.angular.module('angularjs-chart-service', []);

    angularJSChartService.factory('chartService', function () {
        return {
            getChart: getChart
        };

        /*
            chartItems: {
                Date: this is this label
                Value: this is the data value per point
                Value(1-n): these are used for multiple datasets, such as a stacked bar graph. n={chartOptions.amountOfDatasets}. Want to combine with Value one day
            }

            chartOptions: {
                series: the labels used for line charts
                options: the chart-js options used by http://jtblin.github.io/angular-chart.js/
                labelDateFormat: the moment.js date format string to use for {this.labels}
                multiDimensionalData: whether or not to use an array wrapper, pie charts don't require, line charts do
                randomColors: whether or not to use random colors
            }

            returns chart: {
                series: the labels used for line charts
                labels: labels will be generated by the value of {chartItems.Date}; dates will be formatted based on {this.labelDateFormat}, all others will return raw value
                data: data will be generated by the value of {chartItems.Value}/{chartItems.Value(1-n)}
                colors: will use default if not specified
                options: the chart-js options used by http://jtblin.github.io/angular-chart.js/ otherwise default
                amountOfDatasets: the value of n for {chartItems.Value(1-n)}.
            }
        */
        function getChart(chartItems, chartOptions) {
            var chart = {};

            chartOptions = chartOptions || {};

            // series
            chart.series = chartOptions.series;

            // labels
            chart.labels = generateChartLabels(chartItems);

            // data
            chart.data = generateChartData(chartItems, chartOptions.amountOfDatasets, chartOptions.multiDimensionalData);

            // colors
            chart.colors = generateChartColors(chartOptions.colors);

            // options
            chart.options = generateChartOptions(chartOptions.options);
            chart.options.responsive = true; // respond to it's container
            chart.options.maintainAspectRatio = false; // correctly for all

            return chart;

            function getDefaultOptions() {
                return {
                    legend: {
                        display: true
                    }
                };
            }

            function generateChartOptions(options) {
                return options || getDefaultOptions();
            }

            function generateChartLabels(chartItems) {
                var result = chartItems.map(function (o) {
                    return o['Label']; // otherwise return default
                });

                return result;
            }

            function generateChartData(chartItems, amountOfDatasets, multiDimensionalData) {

                if (multiDimensionalData === undefined) {
                    multiDimensionalData = true; // default to true
                }

                var result = [];
                if (amountOfDatasets) {
                    for (var i = 0; i < amountOfDatasets; i++) {
                        result.push(chartItems.map(function (o) {
                            return o['Value' + (i + 1)]; // mapping must be 1-indexed
                        }));
                    }
                }
                else {
                    result.push(chartItems.map(function (o) {
                        return o['Value'];
                    }));
                }

                return multiDimensionalData ? result : result[0];
            }

            function generateChartColors(colors) {
                return colors || Chart.defaults.global.colors;
            }
        }
    });
})();