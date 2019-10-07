/* global variables */
let map;
let markers_all = [];
let mrt_markers = [];
let buttonCounter = 0;

/* global $ */
/* global mapboxgl */
/* global axios*/
/* global dc, d3, crossfilter */
/* global queue */
/* global _ */

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
            for (let each of ewasteLoc) {
                let each_loc = each.geometry.coordinates;
                let epopup = new mapboxgl.Popup({
                    offset: 20
                })
                let excessInfoStr = each.properties.Description;
                let cutStr = excessInfoStr.substring(0, excessInfoStr.length - 281);
                epopup.setHTML(`${cutStr}`);
                let el = document.createElement("div");
                el.className = "e-marker";
                let eMark = new mapboxgl.Marker(el)
                    .setLngLat([each_loc[0], each_loc[1]])
                    .addTo(map)
                    .setPopup(epopup);

                $(el).click(function() {
                    map.flyTo({
                        center: [each_loc[0], each_loc[1]],
                        speed: 0.5
                    })
                })
            }
        })
}

//mrt location
function setupMrt(){
    queue()
        .defer(d3.csv, "data/mrtsg.csv")
        .await(function(error, mrtData) {
            for (let mrt of mrtData) {
                $("#mrt-select").append(`<option>${mrt.STN_NAME}</option>`);
                $("#search-mrt").click(function() {
                    button2Animate()
                    let mrtTerms = $("#mrt-select").val();
                    if (mrtTerms == mrt.STN_NAME){
                        for (let markers of mrt_markers) {
                            markers.remove()
                        }
                        let popup = new mapboxgl.Popup({
                            offset: 20
                        })
                        popup.setHTML(`<div style="text-align:center; border-radius:5px"><h5>${mrt.STN_NAME}</h5><p>${mrt.COLOR} Line</p><div>`)
                        let el3 = document.createElement("div");
                        el3.className = "mrt-marker";
                        let mrts = new mapboxgl.Marker(el3)
                            .setLngLat([mrt.Longitude, mrt.Latitude])
                            .addTo(map)
                            .setPopup(popup);
                        mrt_markers.push(mrts);
                        map.flyTo({
                            center: [mrt.Longitude, mrt.Latitude],
                            zoom: 13,
                            speed: 0.5,
                            curve: 1
                        })
                    }
                })
            }
        })

}


//foursquare constants for apikeys
const CLIENT_ID = 'DTMGUITHBOR02GGOE5HWBENBOPQM4BCMTJWDHVSZGZ1E3XAS';
const CLIENT_SECRET = 'B0V0ZCE2GGK5JSQZSAB1GUPRJNC15501FEFZT23TOYYALTDS';

function button1Animate() {
    return $("#search").html(`<div id="search" style="height: 30px; padding: 0; animation-name:button-animate; animation-duration:0.5s">go</div>`);
}

function button2Animate() {
    return $("#search-mrt").html(`<div id="search" style="height: 30px; padding: 0; animation-name:button-animate; animation-duration:0.5s">go</div>`);
}

//click on 'go' button, will give closest related location on mapbox
function loadLocationClick() {
    $("#search").click(function() {
        button1Animate();
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
                for (let markers of markers_all) {
                    markers.remove()
                }
                for (let each_place of results) {
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
function totalRecycleApi() {
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_recycled,
            limit: 20
        }
    })
}

function totalIncinerateApi() {
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_incinerate,
            limit: 20
        }
    })
}

function totalLandfillApi() {
    return axios.get(base_url_waste, {
        params: {
            resource_id: resource_id_landfill,
            limit: 20
        }
    })
}

//chart - axios callback - 3 x functions for responses from 3 APIs
function totalWaste() {
    axios.all([totalRecycleApi(), totalIncinerateApi(), totalLandfillApi()])
        .then(axios.spread(function(recy, inci, land) {
            let recy_data = recy.data.result.records;
            let inci_data = inci.data.result.records;
            let land_data = land.data.result.records;
            
            //use lodash to convert data into desired format 
            recy_data = _.map(recy_data, function(each_prop){
                return {
                    year: each_prop.year,
                    type: "recycled",
                    weight: each_prop.total_waste_recycled
                }
            })
            
            inci_data = _.map(inci_data, function(each_prop){
                return {
                    year: each_prop.year,
                    type: "incinerated",
                    weight: each_prop.total_waste_incinerated
                }
            })
            land_data = _.map(land_data, function(each_prop){
                return {
                    year: each_prop.year,
                    type: "landfilled",
                    weight: each_prop.total_waste_landfilled
                }
            })
            //consolidate data into a master file
            let master_data = _.concat(recy_data, inci_data, land_data);
            let ndx = crossfilter(master_data);
            
            let year_dim = ndx.dimension(dc.pluck("year"));
            let weight_group = year_dim.group().reduceSum(dc.pluck("weight"));
            
            let weight_distribution = ndx.dimension(dc.pluck("type"));
            let type_group = weight_distribution.group().reduceSum(dc.pluck("weight"));
            
            dc.barChart("#total-waste")
                .width(800)
                .height(200)
                .dimension(year_dim)
                .group(weight_group)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .yAxisLabel("million tonnes")
                .ordinalColors(["#44af69"])
                .useViewBoxResizing(true);
            
            let pieChart = dc.pieChart("#total-waste-dist")
                .height(200)
                .radius(200)
                .dimension(weight_distribution)
                .group(type_group)
                .legend(dc.legend().x(-7).y(150))
                .ordinalColors(['#fcab10', '#2274a5', '#e9164a'])
                .useViewBoxResizing(true);
            dc.renderAll();
        }))
}
//chart for recycle distribution
function recycle_dist_charts(){
  queue()

.defer(d3.csv, "data/recycling-rate-by-waste-type.csv")
.await(function(error, data_waste){
  let ndx2 = crossfilter(data_waste);

  let parseDate = d3.time.format("%Y").parse;
  data_waste.forEach(function(d){
    d.year = parseDate(d.year);
  })

  let date_dim = ndx2.dimension(dc.pluck("year"))

  let minDate = date_dim.bottom(1)[0].year;
  let maxDate = date_dim.top(1)[0].year;

  let cDebris = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Construction Debris"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let uSlag = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Used Slag"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let fMetal = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Ferrous Metal"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let sTyres = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Scrap Tyres"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let nFMetal = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Non-Ferrous Metal"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let wood = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Wood"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let paperCard = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Paper/Cardboard"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let hortiW = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Horticultural Waste"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let plastics = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Plastics"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let glass = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Glass"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let food = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Food"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let textiles = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Textiles"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let ashSludge = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Ash and Sludge"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  let others = date_dim.group().reduceSum(function(d){
    if (d.waste_type === "Others"){
      return +d.recycling_rate;
    }else{
      return 0;
    }
  })
  //recyling's composition type chart - trend over over a timeline of 15years 
  let compChart = dc.compositeChart("#composite-chart");

  compChart
    .width(1200)
    .height(500)
    .dimension(date_dim)
    .x(d3.time.scale().domain([minDate, maxDate]))
    .yAxisLabel("recycling rates(%)")
    .legend(dc.legend().x(50).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .compose([
      dc.lineChart(compChart)
        .colors("#477890")
        .group(cDebris, "Construction Debris"),
      dc.lineChart(compChart)
        .colors("#57849a")
        .group(uSlag, "Used Slag"),
      dc.lineChart(compChart)
        .colors("#6890a4")
        .group(ashSludge, "Ash and Sludge"),
      dc.lineChart(compChart)
        .colors("#799cae")
        .group(fMetal, "Ferrous Metal"),
      dc.lineChart(compChart)
        .colors("#89a9b8")
        .group(sTyres, "Scrap Tyres"),
      dc.lineChart(compChart)
        .colors("#9ab5c2")
        .group(nFMetal, "Non-Ferrous Metal"),
      dc.lineChart(compChart)
        .colors("#abc1cc")
        .group(wood, "Wood"),
      dc.lineChart(compChart)
        .colors("#bccdd6")
        .group(hortiW, "Horticultural Waste"),
      dc.lineChart(compChart)
        .colors("#bb0a21")
        .group(paperCard, "Paper/Cardboard"),
      dc.lineChart(compChart)
        .colors("#f45b69")
        .group(plastics, "Plastics"),
      dc.lineChart(compChart)
        .colors("#ff8811")
        .group(glass, "Glass"),
      dc.lineChart(compChart)
        .colors("#91f5ad")
        .group(food, "Food"),
      dc.lineChart(compChart)
        .colors("#564138")
        .group(textiles, "Textiles"),
      dc.lineChart(compChart)
        .colors("#3423a6")
        .group(others, "Others")
    ])
    .brushOn(false)
    .useViewBoxResizing(true);
  //row chart for total waste generated in 15years, in increasing order
  let types_dim = ndx2.dimension(dc.pluck("waste_type"))
  //custom-reduce to get average rcycling rates per year
  let r_AvgRates = types_dim.group().reduce(
    //add a fact
    function(p,v){
      p.count++;
      p.total += parseFloat(v.recycling_rate);
      p.average = p.total/p.count;
      return p;
    },
    //remove a fact
    function(){
      p.count--;
      if (p.count == 0){
        p.total = 0;
        p.average = 0;
      }else{
        p.total-= parseFloat(v.recycling_rate);
        p.average = p.total/p.count
      }
      return p;
    },
    //initialise
    function(){
      return {count: 0, total: 0, average: 0};
    }
  );
  let distrChart = dc.rowChart("#distr-chart")
    .width(600)
    .height(300)
    .dimension(types_dim)
    .group(r_AvgRates)
    .x(d3.scale.linear())
    .valueAccessor(function (d) {
        return d.value.average;
      })
    .elasticX(true)
    .ordinalColors(["#477890", "#799cae","#57849a","#9ab5c2","#89a9b8","#abc1cc","#bb0a21","#bccdd6","#ff8811","#f45b69","#91f5ad","#564138","#3423a6","#6890a4"])
    .useViewBoxResizing(true)
    .ordering(function(d) { return -d.value.average });

  dc.renderAll();
  //add x-axis labels for both charts
  function xAxisLabel(chart, xtext)
{
    chart.svg()
                .append("text")
                .attr("class", "x-axis-label")
                .attr("text-anchor", "middle")
                .attr("x", chart.width()/2)
                .attr("y", chart.height()-3.5)
                .text(xtext);
}
  xAxisLabel(distrChart, "million tonnes");
  xAxisLabel(compChart, "year");
  })
}

//add axis labels link:
//https://stackoverflow.com/questions/21114336/how-to-add-axis-labels-for-row-chart-using-dc-js-or-d3-js
//add special mentions to code institute on strong tutorials on how to do dc.js charts. 

//DOM READY FUNCTION
$(function() {
    //load map
    setupMap();
    //load mrt
    setupMrt();
    //setup current location click
    loadLocationClick();
    //load bar charts
    totalWaste();
    //load line charts
    recycle_dist_charts()
    //set up Single Page Application
    $(".pages").hide();
    $("#page-one").show();

    $(".nav-link").click(function() {
      totalWaste();
      recycle_dist_charts();
      //play maps loading animation when during navigations
      let page = $(this).data("dest");
      $(".pages").hide();
      $('#' + page).show();
    })
})
