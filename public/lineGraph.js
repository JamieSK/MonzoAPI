let LineGraph = function(container, title, yTitle, series) {
  Highcharts.chart(container, {
    title: {
      text: title,
    },
    yAxis: {
      title: {
        text: yTitle,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        label: {
          connectorAllowed: false,
        },
        tooltip: {
          valuePrefix: '£',
      },
        pointStart: 1,
      },
    },
    series: series,
  });
};
