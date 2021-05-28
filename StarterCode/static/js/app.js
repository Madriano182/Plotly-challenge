


function getChart(sample) {


  d3.json("samples.json").then((data) => {
    let samples= data.samples;
    let samples_resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
    let samples_result= samples_resultsarray[0]
    let otu_ids = samples_result.otu_ids;
    let otu_labels = samples_result.otu_labels;
    let sample_values = samples_result.sample_values;


    //  Creating the Bar Chart
    
    let data2 =[
      {
        y:otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:sample_values.slice(0,10).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"

      }
    ];

    let layout_bar = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 35, l: 155 }
    };

    Plotly.newPlot("bar", data2, layout_bar);



    // Creating the Bubble Chart
    let layout_bub = {
        margin: { t: 0 },
        xaxis: { title: "Id's" },
        hovermode: "closest",
        };
  
        let data1 = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            color: otu_ids,
            size: sample_values,
            }
        }
      ];
  
      Plotly.plot("bubble", data1, layout_bub);
  });
}
   
function getData(sample) {
    d3.json("samples.json").then((data) => {
      let metadata= data.metadata;
      let resultarray= metadata.filter(sampleobject => sampleobject.id == sample);
      let result= resultarray[0]
      let db = d3.select("#sample-metadata");
      db.html("");
      Object.entries(result).forEach(([key, value]) => {
        db.append("h6").text(`${key}: ${value}`);
      });

     
    
    });
  }



function init() {
  
  let select = d3.select("#selDataset");

  //Using names for the options
  d3.json("samples.json").then((data) => {
    let sampleNames = data.names;
    sampleNames.forEach((sample) => {
      select
        .append("option")
        .text(sample)
    });

    // Display default charts
    let firstSample = sampleNames[0];
    getChart(firstSample);
    getData(firstSample);
  });
}

function optionChanged(updatedSample) {
  getChart(updatedSample);
  getData(updatedSample);
}

init();