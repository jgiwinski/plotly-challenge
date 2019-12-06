// Run all of this when the window is done loading.
window.onload = function(e) {
    
    // using d3 to call data from samples.json file. 
    d3.json("samples.json").then((sample) => {

        // html elements
        var personDiv       = d3.select("#sample-metadata"); 
        var dropdown        = document.getElementById("selDataset"); 

        // Data vars
        var peopleIDS       = sample.names; 
        var people          = sample.metadata;
        var sampleResults   = sample.samples;

        // Set default dropdown text.
        var defaultOption   = document.createElement('option');
        defaultOption.text  = "Select Option"; 
        dropdown.add(defaultOption); 

        // Add all people ids to the dropdown.
        peopleIDS.forEach(function(id){
          var option    = document.createElement('option'); 
          option.text   = id;
          option.value  = id; 
          dropdown.add(option,id); 
        });

        // Add listener to dropdown that find the person and populates it in the box.
        dropdown.addEventListener('change', function(event){
        
          // Get value of the option selected.
          var id = event.target.value;

          // Empty the person div element.
          personDiv.html("");
      
          // Scan for the person metadata selected and insert when ID is found.
          people.forEach(function(person){
            
            if (id == person.id) {
              Object.entries(person).forEach(function([key, value]){
                
                // Display demographic info.
                var row = personDiv.append("p"); 
                row.text(`${key}: ${value}`); 
              }); 
            }
          });

          // Scan for the person sample restults selected and display a bubble chart.
          sampleResults.forEach(function(sample){
            
            if (id == sample.id) {

              Object.entries(sample).forEach(function([key, value]){

                // Display bubble chart of belly button bacteria.
                var x_axis = sample.otu_ids;
                var y_axis = sample.sample_values;
                var size   = sample.sample_values;
                var color  = sample.otu_ids;
                var texts  = sample.otu_labels;

                var bubble = {
                  x: x_axis,
                  y: y_axis,
                  text: texts,
                  mode: `markers`,
                  marker: {
                    size: size,
                    color: color
                  }};

                var layout = {
                  title: "Belly Button Bacteria",
                  xaxis: {title: "OTU ID"}};

                Plotly.newPlot("bubble", [bubble], layout);   
              }); 
            }
          });

        });
      });
  }