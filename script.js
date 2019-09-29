/* global variables */
let map;
let markers_all = [];

//fly-to interactivity on maps for both markers on ewaste and search values
function flyToStoreE(currentLoc) {
  map.flyTo({
    center: currentLoc.geometry.coordinates,
    zoom: 15
  });
}

function flyToStoreS(currentLoc) {
  map.flyTo({
    center: currentLoc.geometry.coordinates,
    zoom: 15
  });
}


/* global mapboxgl */

//map launch function that includes e-waste locations across singapore
function setupMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoiamF5bWFubXQiLCJhIjoiY2sweXFzaHBwMDI5YTNubGc1c255aHp1cCJ9.hdMY8-5YXAPS3wasvO1kbg";

    map = new mapboxgl.Map({
        container: "map",
        center: [103.8198, 1.3521],
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 11
        
    });
    map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
    }));
    
    axios.get("data/e-waste-recycling-geojson.json")
            .then(function(response) {
                let ewasteLoc = response.data.features
                for (let each of ewasteLoc){
                    each_loc = each.geometry.coordinates;
                    let epopup = new mapboxgl.Popup({
                    offset: 25
                    })
                    let excessInfoStr = each.properties.Description;
                    let cutStr = excessInfoStr.substring(0,excessInfoStr.length-281);
                    epopup.setHTML(`${cutStr}`);
                    let el = document.createElement("div");
                    el.className = "e-marker";
                    eMark = new mapboxgl.Marker(el)
                    .setLngLat([each_loc.slice(0,1), each_loc.slice(1,2)])
                    .addTo(map)
                    .setPopup(epopup);
                }
                //UNSURE NEED TO ASK FOR HELP!
                // $(".e-marker").click(function(){
                //         map.flyTo({
                //             center: [this.ewasteLoc.geometry.coordinates.slice(0,1), this.ewasteLoc.geometry.coordinates.slice(1,2)],
                //             zoom: 12
                //         })
                //     })
            })
}



//foursquare constants for apikeys
const CLIENT_ID = 'DTMGUITHBOR02GGOE5HWBENBOPQM4BCMTJWDHVSZGZ1E3XAS';
const CLIENT_SECRET = 'B0V0ZCE2GGK5JSQZSAB1GUPRJNC15501FEFZT23TOYYALTDS';

//load locations based on search terms
/* global axios*/
//click on go buton, will load destinations given location
function loadLocationClick() {
    $("#search").click(function() {
        let searchTerms = $("#destination").val();
        let base_url = "https://api.foursquare.com/v2";
        axios.get(base_url + '/venues/explore', {
            params: {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "v": "20190929",
                "limit": 3,
                "ll": '1.2933, 103.7831',
                "query": searchTerms
            }
        })
        .then(function(response) {
            let results = response.data.response.groups[0].items
            for (let markers of markers_all){
                markers.remove()
            }
            for (let each_place of results){
                let name = each_place.venue.name;
                let address = each_place.venue.location.address;
                let popup = new mapboxgl.Popup({
                    offset: 25
                })
                popup.setHTML(`<h3>${name}</h3><p>${address}</p>`)
                let m = new mapboxgl.Marker()
                    .setLngLat([each_place.venue.location.lng, each_place.venue.location.lat])
                    .addTo(map)
                    .setPopup(popup);
                    markers_all.push(m);
            }
        })
        
    })
}

//click on go again button, will load destinations around entered location
//should require foursquare

//axios testing
//axios.get console.log(response) tested and working
// axios.get("data/e-waste-recycling-geojson.json")
//     .then(function(response){
//         console.log(response);
//     })

/* global $ */

//DOM READY FUNCTION
$(function() {
    //load map
    setupMap();
    //setup current location click
    loadLocationClick();
    //set up Single Page Application
    $(".pages").hide();
    $("#page-one").show();

    $(".nav-link").click(function() {
        let page = $(this).data("dest");
        $(".pages").hide();
        $('#' + page).show();
    })

})
