//Use the D3 library to read in `samples.json`.
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Initializes the page with a default plot
function init() {
    d3.json("samples.json").then(function(data){
      console.log(data);
    
      var samp_data = data.names;
      //Populate drop down menu
      var dropdownMenu = d3.select("#selDataset");
      samp_data.forEach(function(name){dropdownMenu.append("option").text(name).property("value",name)})
  
      var samp_val = data.samples[0].sample_values;
      var otuIds = data.samples[0].otu_ids;
      var otuLabels = data.samples[0].otu_labels;
      var otu_ids = otuIds.map(d => `OTU ${d.toString()}`)
      var sliced = otu_ids.slice(0,10);
  
      var meta_id = data.metadata[0].id;
      var meta_eth = data.metadata[0].ethnicity;
      var meta_gen = data.metadata[0].gender;
      var meta_age = data.metadata[0].age;
      var meta_loc = data.metadata[0].location;
      var meta_type = data.metadata[0].bbtype;
      var meta_freq = data.metadata[0].wfreq;
  
      var trace2 = {
        x: otuIds,
        y: samp_val,
        text: otuLabels,
        mode: 'markers',
        marker: {
          color: otuIds,
          size: samp_val}
      };
      var layout = {title: "Bubble Chart",xaxis: {title: 'OTU IDs'}};
      data2 = [trace2];
      Plotly.newPlot("bubble",data2,layout)
      var trace1 = {
        x: samp_val,
        y: sliced,
        text: otuLabels,
        type: "bar",
        orientation: "h"
      }
      data = [trace1];
      Plotly.newPlot("bar", data);
      //Create demogaphic table
      var dem = d3.select("#sample-metadata");
      
      dem.append("div").text(`id: ${meta_id}`);
      dem.append("div").text(`ethnicity: ${meta_eth}`);
      dem.append("div").text(`gender: ${meta_gen}`);
      dem.append("div").text(`age: ${meta_age}`);
      dem.append("div").text(`location: ${meta_loc}`);
      dem.append("div").text(`bbtype: ${meta_type}`);
      dem.append("div").text(`wfreq: ${meta_freq}`);
  
      //Create gauge chart
      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: meta_freq,
          title: {text: "Belly Button Washing Frequency"},
          type: "indicator",
          mode: "gauge+number+delta",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 9], color: "lightgreen" }]    
            }
        }
      ];
      Plotly.newPlot('gauge', data);
    });
  }
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
    // This function is called when a dropdown menu item is selected
  function updatePlotly(){
    d3.json("samples.json").then(function(data){
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      samp_data = data.samples;
  
      var filtered_data = samp_data.filter(d => d.id == dataset)[0]
      samp_val = filtered_data.sample_values;
     
      var filt_ids = samp_data.filter(d => d.id == dataset)[0]
      otuIds = filt_ids.otu_ids;
      
      var filt_lab = samp_data.filter(d => d.id == dataset)[0]
      otuLabels = filt_lab.otu_labels;
    
      var otu_ids = otuIds.map(d => `OTU ${d.toString()}`)
      var sliced = (otu_ids.slice(0,10))
    
  
      Plotly.restyle("bar", "x", [samp_val]);
      Plotly.restyle("bar", "y", [sliced]);
      Plotly.restyle("bubble","x",[otuIds]);
      Plotly.restyle("bubble","y",[samp_val]);
  
      meta_data = data.metadata;
  
      var filtered_id = meta_data.filter(d => d.id == dataset)[0]
      meta_id = filtered_id.id;
      var filtered_eth = meta_data.filter(d => d.id == dataset)[0]
      meta_eth = filtered_eth.ethnicity;
      var filtered_gen = meta_data.filter(d => d.id == dataset)[0]
      meta_gen = filtered_gen.gender;
      var filtered_age = meta_data.filter(d => d.id == dataset)[0]
      meta_age = filtered_age.age;
      var filtered_loc = meta_data.filter(d => d.id == dataset)[0]
      meta_loc = filtered_loc.location;
      var filtered_type = meta_data.filter(d => d.id == dataset)[0]
      meta_type = filtered_type.bbtype;
      var filtered_freq = meta_data.filter(d => d.id == dataset)[0]
      meta_freq = filtered_freq.wfreq;
  
      var dem = d3.select("#sample-metadata");
      dem.html("");
      
      dem.append("div").text(`id: ${meta_id}`);
      dem.append("div").text(`ethnicity: ${meta_eth}`);
      dem.append("div").text(`gender: ${meta_gen}`);
      dem.append("div").text(`age: ${meta_age}`);
      dem.append("div").text(`location: ${meta_loc}`);
      dem.append("div").text(`bbtype: ${meta_type}`);
      dem.append("div").text(`wfreq: ${meta_freq}`);
  
      Plotly.restyle("gauge","value",[meta_freq]);
  
    });
    
  
  };
  init();