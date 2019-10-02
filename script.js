/* global variables */
let map;
let markers_all = [];
let buttonCounter = 0;

/* global $ */
/* global mapboxgl */
/* global axios*/
/* global dc */

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
                let ewasteLoc = response.data.features;
                for (let each of ewasteLoc){
                    let each_loc = each.geometry.coordinates;
                    let epopup = new mapboxgl.Popup({
                    offset: 20
                    })
                    let excessInfoStr = each.properties.Description;
                    let cutStr = excessInfoStr.substring(0,excessInfoStr.length-281);
                    epopup.setHTML(`${cutStr}`);
                    let el = document.createElement("div");
                    el.className = "e-marker";
                    let eMark = new mapboxgl.Marker(el)
                    .setLngLat([each_loc[0], each_loc[1]])
                    .addTo(map)
                    .setPopup(epopup);
                    
                     $(el).click(function(){
                        map.flyTo({
                            center: [each_loc[0], each_loc[1]],
                            speed: 0.5
                        })
                    })
                }
            })
}

//foursquare constants for apikeys
const CLIENT_ID = 'DTMGUITHBOR02GGOE5HWBENBOPQM4BCMTJWDHVSZGZ1E3XAS';
const CLIENT_SECRET = 'B0V0ZCE2GGK5JSQZSAB1GUPRJNC15501FEFZT23TOYYALTDS';
const master_data = [];

function buttonAnimate(){
    return $("#search").html(`<div id="#search" style="height: 26px; padding: 0; animation-name:button-animate; animation-duration:0.5s">go</div>`);
}

//click on 'go' button, will give closest related location on mapbox
function loadLocationClick() {
    $("#search").click(function() {
        buttonAnimate();
        let searchTerms = $("#destination").val();
        let base_url = "https://api.foursquare.com/v2";
        axios.get(base_url + '/venues/explore', {
            params: {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "v": "20190929",
                "limit": 1,
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
                    offset: 20
                })
                popup.setHTML(`<div style="text-align:center; border-radius:5px"><h5>${name}</h5><p>Address:${address}</p><div>`)
                let el2 = document.createElement("div");
                    el2.className = "e-marker2";
                let m = new mapboxgl.Marker(el2)
                    .setLngLat([each_place.venue.location.lng, each_place.venue.location.lat])
                    .addTo(map)
                    .setPopup(popup);
                    markers_all.push(m);
                map.flyTo({
                            center: [each_place.venue.location.lng, each_place.venue.location.lat],
                            zoom: 13,
                            speed: 0.5,
                            curve: 1
                        })
            }
        })
        
    })
}
//charts

//chart api resource ids
let base_url_waste = 'https://data.gov.sg/api/action/datastore_search';
let resource_id_total_waste = "12dd93ba-1d2e-4593-9cc0-9aac83885e9f";
let resource_id_recycled = "00fe011e-e4fb-45c5-b23d-a62143048eba";
let resource_id_incinerate = "e4c8461f-e7de-4fc3-ad25-cf068ae09509";
let resource_id_landfill = "81292d12-57a5-4e76-a65b-effacc6806b7";
let resource_id_truth = "4d83d0be-55ba-46de-8430-2ff708fede5c";

//3 x axios functions to be called in axios callback.
function totalRecycleApi(){
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_recycled,
            limit: 20
        }
    })
}

function totalIncinerateApi(){
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_incinerate,
            limit: 20
        }
    })
}

function totalLandfillApi(){
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_landfill,
            limit: 20
        }
    })
}

//chart - axios callback - 3 x functions for responses from 3 APIs
function totalWaste(){
    axios.all([totalRecycleApi(), totalIncinerateApi(), totalLandfillApi()])
        .then(axios.spread(function(recy,inci,land){
            let recy_data = recy.data.result.records;
            let inci_data = inci.data.result.records;
            let land_data = land.data.result.records;
            for (let r of recy_data){
                master_data.push(r);
            }
            let count = 0;
            let count2 = 0
            for (let i of inci_data){
                if (count < master_data.length){
                    master_data[count].total_waste_incinerated = i.total_waste_incinerated;
                    count++;
                }
            }
            for (let l of land_data){
                if (count2 < master_data.length){
                    master_data[count2].total_waste_landfilled= l.total_waste_landfilled;
                    count2++;
                }
            }
            let cf_waste_data = crossfilter(master_data);
            
            let year_dim = cf_waste_data.dimension(dc.pluck("year"));
            let waste_recycled = year_dim.group().reduceSum(dc.pluck("total_waste_recycled"));
            let waste_incinerated = year_dim.group().reduceSum(dc.pluck("total_waste_incinerated"));
            let waste_landfilled = year_dim.group().reduceSum(dc.pluck("total_waste_landfilled"));
            
            let stackChart = dc.barChart("#total-waste-chart");
            stackChart
                .width(800)
                .height(400)
                .dimension(year_dim)
                .group(waste_landfilled,"Landfilled")
                .stack(waste_incinerated, "Incinerated")
                .stack(waste_recycled, "Recycled")
                .transitionDuration(1500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .yAxisLabel("million tonnes")
                .ordinalColors(['#44af69','#fcab10','#2274a5'])
                .useViewBoxResizing(true)
                .legend(dc.legend().x(720).y(0).itemHeight(15).gap(5))
                .margins().right = 100;
            
            dc.barChart("#total-waste-incinerated")
                .width(800)
                .height(400)
                .dimension(year_dim)
                .group(waste_incinerated)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .yAxisLabel("million tonnes")
                .ordinalColors(["#fcab10"])
                .useViewBoxResizing(true);
            
            dc.barChart("#total-waste-recycled")
                .width(800)
                .height(400)
                .dimension(year_dim)
                .group(waste_recycled)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("year")
                .yAxisLabel("million tonnes")
                .ordinalColors(["#2274a5"])
                .useViewBoxResizing(true);
                
            dc.barChart("#total-waste-landfilled")
                .width(800)
                .height(400)
                .dimension(year_dim)
                .group(waste_landfilled)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .yAxisLabel("million tonnes")
                .ordinalColors(["#44af69"])
                .useViewBoxResizing(true);
                
            dc.renderAll();
        }))
}
//chart for recycle distribution
function recycleDistributionApi(){
    axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_truth,
            limit: 225
        }
    })
        .then(function(response){
            let recycle_dist = response.data.result.records;
            recycle_dist.splice(0,210);
            let cf_recycle_dist_data = crossfilter(recycle_dist);
            let material_dim = cf_recycle_dist_data.dimension(dc.pluck("waste_type"));
            let recycling_rate_group = material_dim.group().reduceSum(dc.pluck("recycling_rate"));
            
            dc.rowChart("#total-waste-recycle-truth")
                .width(700)
                .height(500)
                .x(d3.scale.linear())
                .elasticX(true)
                .dimension(material_dim)
                .group(recycling_rate_group)
                .ordinalColors(["#ffc145"])
                .useViewBoxResizing(true)

            dc.renderAll();
            
            })
}


//DOM READY FUNCTION
$(function() {
    //load map
    setupMap();
    //setup current location click
    loadLocationClick();
    //load bar charts
    totalWaste();
    //load row chart
    recycleDistributionApi()
    //set up Single Page Application
    $(".pages").hide();
    $("#page-one").show();

    $(".nav-link").click(function() {
        let page = $(this).data("dest");
        $(".pages").hide();
        $('#' + page).show();
    })
})
