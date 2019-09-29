/* global mapboxgl */
function setupMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoiamF5bWFubXQiLCJhIjoiY2sweXFzaHBwMDI5YTNubGc1c255aHp1cCJ9.hdMY8-5YXAPS3wasvO1kbg";

    map = new mapboxgl.Map({
        container: "map",
        center: [103.8198, 1.3521],
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 11
    });
}

/* global axios*/

//axios.get console.log(response) tested and working
axios.get("data/e-waste-recycling-geojson.json")
    .then(function(response){
        console.log(response);
    })
    
/* global $ */

//DOM READY FUNCTION
$(function(){
    //set up Single Page Application
    $(".pages").hide();
    $("#page-one").show();
    
    $(".nav-link").click(function(){
        let page = $(this).data("dest");
        $(".pages").hide();
        $('#' + page).show();
    })
})