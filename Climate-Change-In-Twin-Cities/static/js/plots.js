// Fetch the json and log to console

const url = 'http://127.0.0.1:5000/api/v1.0/AnnualizedWeather'

d3.json(url).then(function(data) {
  console.log(data)


let first = 0
let second = 0
let third = 0
let fourth = 0
let fifth = 0
let sixth = 0

//Create empty list for each variable
let MaxList = []
let MinList = []
let SeasonList = []
let SnowfallList = []

//Loop through each dictionary, recording each value and appending to the lists
for (var j=0;j<data.length;j++) {

  let MaxTemp = data[j].AvgMaxTemp;
  let MinTemp = data[j].AvgMinTemp;
  let Year = data[j].Season;
  let Snowfall = data[j].TotalSnowfall;
  MaxList.push(MaxTemp);
  MinList.push(MinTemp);
  SeasonList.push(Year);
  SnowfallList.push(SnowfallList);

  if (data[j].Season < 1920) {
    first += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1940) {
    second += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1960) {
    third += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1980) {
    fourth += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 2000) {
    fifth += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 2020) {
    sixth += data[j].DaysWithSnowCover_6
  ;}
 

};


// Display the default plot
function init() {
  var Temperatures = {
    x: SeasonList,
    y: MaxList,
    type: 'scatter'
  };
  
  var layout = {
    title: 'Average Temperature over Time',
    xaxis: {
      title: 'Season (December to February)',
    },
    yaxis: {
      title: 'Temperature (F)',
    }
  };
  var data = [Temperatures];
  
  Plotly.newPlot('line', data,layout);
}





// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'AvgMaxTemp') {
      data = MaxList;
  }
  else if (dataset == 'AvgMinTemp') {
      data = MinList;
  }

// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("line", "y", [newdata]);
}

init();

// Chart.js plot

let firstPlusPerc = (Math.round(first / 1805 * 100))
let secondPlusPerc = (Math.round(second / 1805 * 100))
let thirdPlusPerc = (Math.round(third / 1805 * 100))
let fourthPlusPerc = (Math.round(fourth / 1805 * 100))
let fifthPlusPerc = (Math.round(fifth / 1805 * 100))
let sixthPlusPerc = (Math.round(sixth / 1805 * 100))

let firstMinusPerc = (Math.round((1805-first) / 1805 * 100))
let secondMinusPerc = (Math.round((1805-second) / 1805 * 100))
let thirdMinusPerc = (Math.round((1805-third) / 1805 * 100))
let fourthMinusPerc = (Math.round((1805-fourth) / 1805 * 100))
let fifthMinusPerc = (Math.round((1805-fifth) / 1805 * 100))
let sixthMinusPerc = (Math.round((1805-sixth) / 1805 * 100))

let sixPlusData = [firstPlusPerc + '%', secondPlusPerc + '%', thirdPlusPerc + '%', fourthPlusPerc + '%', fifthPlusPerc + '%', sixthPlusPerc + '%']
let sixMinusData = [firstMinusPerc + '%', secondMinusPerc + '%', thirdMinusPerc + '%', fourthMinusPerc + '%', fifthMinusPerc + '%', sixthMinusPerc + '%']

console.log(sixPlusData);
console.log(sixMinusData);

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "1900-1920 % > 6in",
      "1900-1920 % < 6in",
      "1920-1940 % > 6in",
      "1920-1940 % < 6in",
      "1940-1960 % > 6in",
      "1940-1960 % < 6in",
      "1960-1980 % > 6in",
      "1960-1980 % < 6in",
      "1980-2000 % > 6in",
      "1980-2000 % < 6in",
      "2000-2020 % > 6in",
      "2000-2020 % < 6in",
    ],
    datasets: [
      { backgroundColor: ["#AAA", "#777"], data: [firstPlusPerc, firstMinusPerc] },
      {
        backgroundColor: ["hsl(0, 100%, 60%)", "hsl(0, 100%, 35%)"],
        data: [secondPlusPerc, secondMinusPerc]
      },
      {
        backgroundColor: ["hsl(100, 100%, 60%)", "hsl(100, 100%, 35%)"],
        data: [thirdPlusPerc, thirdMinusPerc]
      },
      {
        backgroundColor: ["hsl(180, 100%, 60%)", "hsl(180, 100%, 35%)"],
        data: [fourthPlusPerc, fourthMinusPerc]
      },
      {
        backgroundColor: ["hsl(160, 100%, 60%)", "hsl(160, 100%, 35%)"],
        data: [fifthPlusPerc, fifthMinusPerc]
      },
      {
        backgroundColor: ["hsl(200, 100%, 60%)", "hsl(200, 100%, 35%)"],
        data: [sixthPlusPerc, sixthMinusPerc]
      }
    ]
  },
  options: {
    legend: {
      labels: {
        generateLabels: function(context) {
          // Get the default label list
          var original = Chart.defaults.pie.legend.labels.generateLabels;
          var labels = original.call(this, context);

          // Build an array of colors used in the datasets of the chart
          var datasetColors = context.chart.data.datasets.map(function(e) {
            return e.backgroundColor;
          });
          datasetColors = datasetColors.flat();

          // Modify the color and hide state of each label
          labels.forEach(label => {
            // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
            label.datasetIndex = (label.index - label.index % 2) / 2;

            // The hidden state must match the dataset's hidden state
            label.hidden = !context.chart.isDatasetVisible(label.datasetIndex);

            // Change the color to match the dataset
            label.fillStyle = datasetColors[label.index];
          });

          return labels;
        }
      },
      onClick: function(mouseEvent, legendItem) {
        // toggle the visibility of the dataset from what it currently is
        this.chart.getDatasetMeta(
          legendItem.datasetIndex
        ).hidden = this.chart.isDatasetVisible(legendItem.datasetIndex);
        this.chart.update();
      }
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var labelIndex = (tooltipItem.datasetIndex * 2) + tooltipItem.index;
          return data.labels[labelIndex] + ": "+ data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        }
      }
    }
  }
});


});