const StreamGraph = function(container, title, subtitle, categories, series) {
  new Highcharts.Chart(container, {
        chart: {
            type: 'streamgraph',
            marginBottom: 30,
            zoomType: 'x',
        },
        title: {
            floating: true,
            align: 'left',
            text: title,
        },
        subtitle: {
            floating: true,
            align: 'left',
            y: 30,
            text: subtitle,
        },
        xAxis: {
            maxPadding: 0,
            type: 'category',
            crosshair: true,
            categories: categories,
            labels: {
                align: 'left',
                reserveSpace: false,
                rotation: 270,
            },
            lineWidth: 0,
            margin: 20,
            tickWidth: 0,
        },
        yAxis: {
            visible: false,
            startOnTick: false,
            endOnTick: false,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                label: {
                    minFontSize: 5,
                    maxFontSize: 15,
                    style: {
                        color: 'rgba(255,255,255,0.75)',
                    },
                },
            },
        },
        series: series,
  });
};
