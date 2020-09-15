// Initialize array for source data
var sourceData = [];

// Load source data, make data promise, and push data to array, promise at bottom
d3.json("samples.json").then(function(data) {
    sourceData.push(data);

    // Populate dropdown menu
    var dropdownList = sourceData[0].names;
    var dropdownID = -1
    dropdownList.forEach(function(item) {
        var option = document.createElement("option");
        option.text = item;
        option.id = dropdownID + 1;
        document.getElementById("selDataset").appendChild(option);
        dropdownID += 1
    });

    // Points for default bar and bubble charts
    var sampleValues = sourceData[0].samples[0].sample_values;
    var barValues = [];
    sampleValues.slice([0], [10]).map((item, i) => {
        barValues.push(item);
    });
    var otuIDS = sourceData[0].samples[0].otu_ids;
    var barLabels = [];
    otuIDS.slice([0], [10]).map((item, i) => {
        barLabels.push(`OTU ${item}`);
    });
    var otuLabels = sourceData[0].samples[0].otu_labels;
    var hoverLabels = [];
    otuLabels.slice([0], [10]).map((item, i) => {
        hoverLabels.push(item);
    });
         
    // ar chart
    var barTrace = {
        x: barValues.reverse(),
        y: barLabels.reverse(),
        type: "bar",
        orientation: "h",
        text: hoverLabels.reverse()
    };

    var barData = [barTrace];
    Plotly.newPlot("bar", barData);
 
    // bubble chart
    var bubbleTrace = {
        x: otuIDS,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIDS
        }
    };

    var layout = {
        xaxis: {
            title: "OTU ID"
        }
    };

    var bubbleData = [bubbleTrace];
    Plotly.newPlot("bubble", bubbleData, layout);

    // Populate default demographic info
    var name = sourceData[0].metadata[0].id;
    var ethnicity = sourceData[0].metadata[0].ethnicity;
    var gender = sourceData[0].metadata[0].gender;
    var age = sourceData[0].metadata[0].age;
    var location = sourceData[0].metadata[0].location;
    var bbtype = sourceData[0].metadata[0].bbtype;
    var wfreq = sourceData[0].metadata[0].wfreq;
    document.getElementById("sample-metadata")
        .innerHTML += `<p><b>ID: </b>${name}<br><b>Ethnicity: </b>${ethnicity}<br><b>Gender: </b>${gender}<br><b>Age: </b>${age}<br><b>Location: </b>${location}<br><b>BBType: </b>${bbtype}<br><b>WFreq: </b>${wfreq}</p>`;
    
    // gauge chart
    var gaugeTrace = {
        type: "pie",
        showlegend: false,
        hole: .4,
        rotation: 90,
        values: [100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100],
        text: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: ["rgb(255, 255, 255)", "rgb(255, 230, 230)", "rgb(255, 204, 204)", "	rgb(255, 179, 179)", "rgb(255, 153, 153)", "rgb(255, 128, 128)", "rgb(255, 102, 102)", "rgb(255, 77, 77)", "rgb(255, 51, 51)", "rgb(255, 26, 26)", "rgb(255, 0, 0)", "	rgb(230, 0, 0)", "white"],
            line: {
                color: "white",
                width: 1
            }
        },
    };
    
    var layout = {
        title: "<b>" + "Belly Button Washing Frequency" + "</b>" + "<br>" + "Scrubs Per Week",
        shapes:[{
            type: "line",
            x0: .50,
            y0: .50,
            x1: .28,
            y1: .74,
            line: {
                color: 'black',
                width: 2
            },
        }],
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]}
    };
            
    var gaugeData = [gaugeTrace];
    Plotly.newPlot("gauge", gaugeData, layout);    
    
    //dropdown menu change
    document.getElementById("selDataset").onchange = function() {

        // demographic info
        document.getElementById("sample-metadata")
            .innerHTML = ""

        // Set dropdown variables for user-selected data
        var dropdownMenu = document.getElementById("selDataset");
        var dropdownID = dropdownMenu.selectedIndex

        // Points for user-selected bar and bubble charts
        var sampleValues = sourceData[0].samples[dropdownID].sample_values;
        var barValues = [];
        sampleValues.slice([0], [10]).map((item, i) => {
            barValues.push(item);
        });
        var otuIDS = sourceData[0].samples[dropdownID].otu_ids;
        var barLabels = [];
        otuIDS.slice([0], [10]).map((item, i) => {
            barLabels.push(`OTU ${item}`);
        });
        var otuLabels = sourceData[0].samples[dropdownID].otu_labels;
        var hoverLabels = [];
        otuLabels.slice([0], [10]).map((item, i) => {
            hoverLabels.push(item);
        });
        
        // Build user-selected bar chart
        var barTrace = {
            x: barValues.reverse(),
            y: barLabels.reverse(),
            type: "bar",
            orientation: "h",
            text: hoverLabels.reverse()
        };
        var barData = [barTrace];
        Plotly.newPlot("bar", barData);

        
        var bubbleTrace = {
            x: otuIDS,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIDS
            }
        };

        var bubbleLayout = {
            xaxis: {
                title: "OTU ID"
            }
        };

        var bubbleData = [bubbleTrace];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        
        var name = sourceData[0].metadata[dropdownID].id;
        var ethnicity = sourceData[0].metadata[dropdownID].ethnicity;
        var gender = sourceData[0].metadata[dropdownID].gender;
        var age = sourceData[0].metadata[dropdownID].age;
        var location = sourceData[0].metadata[dropdownID].location;
        var bbtype = sourceData[0].metadata[dropdownID].bbtype;
        var wfreq = sourceData[0].metadata[dropdownID].wfreq;
        document.getElementById("sample-metadata")
            .innerHTML += `<p><b>ID: </b>${name}<br><b>Ethnicity: </b>${ethnicity}<br><b>Gender: </b>${gender}<br><b>Age: </b>${age}<br><b>Location: </b>${location}<br><b>BBType: </b>${bbtype}<br><b>WFreq: </b>${wfreq}</p>`;          
    
        
        var gaugeTrace = {
            type: "pie",
            showlegend: false,
            hole: .4,
            rotation: 90,
            values: [100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100 / 10, 100],
            text: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ["rgb(255, 255, 255)", "rgb(255, 230, 230)", "rgb(255, 204, 204)", "	rgb(255, 179, 179)", "rgb(255, 153, 153)", "rgb(255, 128, 128)", "rgb(255, 102, 102)", "rgb(255, 77, 77)", "rgb(255, 51, 51)", "rgb(255, 26, 26)", "rgb(255, 0, 0)", "	rgb(230, 0, 0)", "white"],
                line: {
                    color: "white",
                    width: 1
                }
            },
        };

        switch (wfreq) {
            case 0:
                var pointX = .25;
                var pointY = .54;
                break;
            case 1:
                var pointX = .25;
                var pointY = .64;
                break;
            case 2:
                var pointX = .28;
                var pointY = .74;
                break;
            case 3:
                var pointX = .36;
                var pointY = .81;
                break;
            case 4:
                var pointX = .46;
                var pointY = .81;
                break;
            case 5:
                var pointX = .55;
                var pointY = .81;
                break;
            case 6:
                var pointX = .64;
                var pointY = .81;
                break;
            case 7:
                var pointX = .72;
                var pointY = .74;
                break;
            case 8:
                var pointX = .73;
                var pointY = .63;
                break;
            case 9:
                var pointX = .75;
                var pointY = .54;
                break;
            default:
                var pointX = .50;
                var pointY = .50;
        }

        var layout = {
            title: "<b>" + "Belly Button Washing Frequency" + "</b>" + "<br>" + "Scrubs Per Week",
            shapes:[{
                type: "line",
                x0: .50,
                y0: .50,
                x1: pointX,
                y1: pointY,
                line: {
                  color: 'black',
                  width: 2
                },
            }],
            xaxis: {visible: false, range: [-1, 1]},
            yaxis: {visible: false, range: [-1, 1]}
        };
        
        var gaugeData = [gaugeTrace];
        Plotly.newPlot("gauge", gaugeData, layout);
        console.log(wfreq);

    };
});
  
// Set data promise
const dataPromise = d3.json("samples.json");