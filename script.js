//setting up Single Page Application





/* global axios*/

//axios.get console.log(response) tested and working
axios.get("data/e-waste-recycling-geojson.json")
    .then(function(response){
        console.log(response);
    })
    
