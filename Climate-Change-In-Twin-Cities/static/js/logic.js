

// Use this link to get the GeoJSON data.
//let link = "http://192.168.1.131:5000/api/v1.0/DailyWeather";
let link = "http://127.0.0.1:5000/api/v1.0/DailyWeather";

function dayOfYear (date) {
    // the following code was pulled from: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return  (day);

}
    crossOrigin: null

d3.json(link).then(function(data) {
    let snowIn = [];
    let snowOut = [];
    // the following from https://www.techiedelight.com/initialize-array-with-range-from-0-to-n-javascript/
    let years = Array.from({length:200}, (item, index) => 1900 + index);

    var currYear = -1

    let isWinter = false;
    let daysNoSnow = 0;
    let dateOptions = { day: 'numeric', month: 'short'}
  //  let dateOptions = {month: 'short'}
    for(let index=data.length-1; index > -1; index--) {
        const dateVal = new Date (data[index]['Date'])
        let foundEnd = 0
        let year = dateVal.getYear();
        let month = dateVal.getMonth() + 1;


        let snowCover = (data[index]['Snow Depth'] > 0);
        if (!snowCover) {
            daysNoSnow++;
        } else {
            daysNoSnow = 0;
        }
        if (daysNoSnow == 1) { 
            snowOut[currYear] = dayOfYear(dateVal);
            console.log ("snow day " + snowOut[currYear])
        }
//        console.log (data[index]['Date'] + " " + daysNoSnow + " " + snowCover);

        if (snowCover && year >= 0 && month > 7 && isWinter == false) {
            isWinter = true;
            daysNoSnow = 0;
            currYear++;
            snowIn[currYear] = dayOfYear(dateVal);
            years[currYear] = (1900 + year);
            console.log ("winter of " + (1900 + currYear) + " starts " + snowIn[currYear]);
        } else if (year >= 0 && month < 8 && isWinter == true && daysNoSnow == 80){
            isWinter = false;
            foundEnd[currYear] = true;
            console.log ("winter of " + (1900 + currYear) + " ends " + snowOut[currYear]);
        }
    }
    let newYears = new Array(currYear  + 1).fill(366)

    console.log (snowIn)
    console.log (snowOut)
    console.log (newYears)


    var trace1 = {
        x: years,
        y: snowIn,
        line: {color: "blue"}, 
        name: "First Snow", 
        showlegend: true,
        type: "scatter"
  
      };
      var trace2 = {
        x: years,
        y: snowOut, 
        fill: "tonexty", 
        fillcolor: "rgba(0,176,246,0.2)", 
        line: {color: "green"}, 
        name: "Last Snow", 
        showlegend: true, 
        type: "scatter",
        yaxis: 'y2'
      };
      var trace3 = {
        x: years,
        y: newYears,
        line: {color: "red"},
        opacity: 0,
        fillcolor: "rgba(0,176,246,0.2)",
        fill: "tonexty",
        name: "January 1",
      }


      var data = [trace1, trace2, trace3];
      var layout = {
        title: {
        text:'<b>Snow Cover in the Twin Cities 1900 - 2023</b>',
        font: {
          family: 'Courier New, monospace',
          size: 24
        },
        xref: 'paper',
        x: 0.05,
    },
        paper_bgcolor: "rgb(255,255,255)", 
        plot_bgcolor: "rgb(229,229,229)", 
        xaxis: {
            title: {
                text: '<b>Year</b>',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
            },
          gridcolor: "rgb(255,255,255)", 
          showgrid: true, 
          showline: false, 
          showticklabels: true, 
          tickcolor: "rgb(127,127,127)", 
          ticks: "outside", 
  //        zeroline: false
        }, 
        yaxis: {
            title: {
                text: '<b>Month</b>',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
            },
            gridcolor: "rgb(255,255,255)", 
            showgrid: true, 
            showline: false,
            range: [(365 + 182), 182],
            showgrid: false, 
            showline: false, 

        //    tickvals:[1, 32, 60, 91, 120, 151, 180, 210, 241, 271, 302, 332],
//            ticktext:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
            tickvals: [182, 213,244,274,305,335,(356+180)],
         //   tickvals:[332,   302,   271,   241,   210,   180, 0],    
            ticktext:['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
            showticklabels: true, 
            tickangle: 45,
            tickcolor: "rgb(127,127,127)", 
            ticks: "outside",
            zeroline: false
        },

        yaxis2: {
            overlaying: 'y',
            gridcolor: "rgb(255,255,255)", 
            showgrid: true, 
            showline: false,
            range: [182, -182],
            showgrid: false, 
            showline: false, 
 //           tickvals: [180, 151,120,91,60,32,1],
            tickvals:[-182, 1, 32, 60, 91, 121, 152],
            ticktext:['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], 
//            ticktext:['', 'May', 'Apr', 'Mar', 'Feb', 'Jan'],
            showticklabels: true, 
            tickangle: 45,
            tickcolor: "rgb(127,127,127)", 
            ticks: "outside",
 //           side: 'right',
             zeroline: false
        }
        
    }
    chartDiv = document.getElementById('layout')
    Plotly.newPlot('chartDiv', data, layout);
  });
