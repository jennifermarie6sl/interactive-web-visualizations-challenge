console.log("app01.js");

var dropdownMenu = d3.select("#selDataset");

// Give button access to the id's. 
function init() {
  d3.json("samples.json").then((data) => {
    console.log("data");
    console.log(data);

    s_ids = data.names;
    console.log("s_ids");
    console.log(s_ids);

    s_ids.map((id) => { //defines the drop down menu
      dropdownMenu
        .append("option")
        .property("value", id)
        .text(id);
    });
    optionChanged(s_ids[0])
  
  });
}; 

// Build bar chart plot
function optionChanged(selected_id) {  //allows for plots to change when new id is selected
  
  console.log("selected_id")
  console.log(selected_id)
  
  d3.json("samples.json").then((data) => {
      var samples = data.samples;
      console.log("samples");
      console.log(samples);

      var results = samples.filter(sampleObj => sampleObj.id == selected_id);
      console.log("results");
      console.log(results[0]);
      
      var otu_ids = results[0].otu_ids;
      var otu_labels = results[0].otu_labels;
      var sample_values = results[0].sample_values;

      var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        console.log("y_label: ");
        console.log(y_label);
      
        console.log("sample_values: ");
        console.log(sample_values.slice(0, 10).reverse());
      
      var bar_trace = {
        y: y_label,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };
      var data = [bar_trace];
      var bar_layout = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", [bar_trace], bar_layout); // or can call data...

      // Bubble chart plot
      var bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          colorscale: "Earth",
          size: sample_values
        }
          };
  
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: {t: 0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
      };
  
      Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout); 

  });   

// Build demographic plot
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    console.log("metadata");
    console.log(metadata);
    
    var results = metadata.filter(metadataObj => metadataObj.id == selected_id);
    var result = results[0];
    console.log("results")
    console.log(results)
    
    console.log("result")
    console.log(result)
    
    var fig = d3.select("#sample-metadata");
    fig.html("");
    Object.entries(results[0]).forEach(([key, value]) => {
      fig.append("h5").text(`${key}: ${value}`);

    buildGauge(result.wfreq);
    });
  });

}
init();