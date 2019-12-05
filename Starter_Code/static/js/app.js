// using d3 to call data from samples.json file. 
function metadata(){
    var metasample = "samples.json";
    d3.json(metasample).then((sample) => {
        var sample_metadata = d3.select("#sample-metadata"); 
        sample_metadata.html(""); 
        Object.entries(sample).forEach(function([key, value]){
            var row = sample_metadata.append("p"); 
            row.text(`${key} : ${value}`); 
        })
    }
)}

metadata();  

// making horizontal bar chart 

// var trace1 = {
//     x: [data.out_ids], 
//     y: [data.sample_values],
//     type: "bar"
// }; 


// function charts(){
//     d3.json("samples.json").then((samples) => {
//         var trace1 = {
//             x: [samples.out_ids], 
//             y: [samples.sample_values],
//             type: "bar"
//         }; 
//         var data = [trace1]; 
//         var layout = {
//             title: "bar chart"
//         }
//         Plotly.newPlot("plot", data, layout);
//      })
// }
// charts(); 
