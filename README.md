# angularjs-chart-service

> AngularJS Service Wrapper for angular-chart.js

* [Overview](#overview)
* [Install](#install)
* [Usage](#usage)

<a name="overview"></a>
## Overview
This is an AngularJS service wrapper for angular-chart.js. 

<a name="install"></a>
## Install
```sh
npm install angularjs-chart-service --save
```

<a name="usage"></a>
## Usage
Include the following script
```html
<script src="angularjs-chart-service.js"></script>
```

Include it in your app.module.js

```js
'use strict';

angular.module('exampleApp', [
  'angularjs-chart-service'
]);
```

Then you can start using it by injecting it into your controller

```js
'use strict';

angular.
    module('example').
    component('example', {
        templateUrl: 'example/example.template.html',
        controller: ['$scope', 'chartService',
            function ExampleController($scope, chartService) {

                $scope.chart = chartService.getChart([
                        {
                            Label: '2011',
                            Value: 1
                        },
                        {
                            Label: '2012',
                            Value: 2
                        },
                        {
                            Label: '2013',
                            Value: 3
                        },
                        {
                            Label: '2014',
                            Value: 4
                        },
                        {
                            Label: '2015',
                            Value: 5
                        },
                        {
                            Label: '2016',
                            Value: 6
                        }
                    ],
                    {
                        series: ['Value']
                    });

                $scope.multiSeriesChart = chartService.getChart([
                    {
                        Label: '2011',
                        Value1: 1,
                        Value2: 2,
                        Value3: 3
                    },
                    {
                        Label: '2012',
                        Value1: 2,
                        Value2: 3,
                        Value3: 4
                    },
                    {
                        Label: '2013',
                        Value1: 3,
                        Value2: 4,
                        Value3: 5
                    },
                    {
                        Label: '2014',
                        Value1: 4,
                        Value2: 5,
                        Value3: 6
                    },
                    {
                        Label: '2015',
                        Value1: 5,
                        Value2: 6,
                        Value3: 7
                    },
                    {
                        Label: '2016',
                        Value1: 6,
                        Value2: 7,
                        Value3: 8
                    }
                ],
                {
                    series: ['Value1', 'Value2', 'Value3'], amountOfDatasets: 3
                });
            }
        ]
    });

```
```html
<div class="container-fluid">
  <div class="row">
      <div class="col-md-6">
          <canvas id="line1" class="chart chart-line" chart-data="chart.data"
                  chart-labels="chart.labels" chart-series="chart.series" chart-options="chart.options"></canvas>
          <canvas id="line2" class="chart chart-line" chart-data="multiSeriesChart.data"
                  chart-labels="multiSeriesChart.labels" chart-series="multiSeriesChart.series" chart-options="multiSeriesChart.options"></canvas>
      </div>
  </div>
</div>
```