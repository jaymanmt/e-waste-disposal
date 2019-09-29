# Project Name: Find your nearest e-waste drop-off
- quickly access data on where to responsibly dispose of e-waste,
this data will include maps on the nearest locations within 5kilometres
for convenience.

# UX:
- all locations for e-waste disposal loaded right away
- added search bar for planning one's vicinity
- added geolocation for centering on one's current location
- zoom adjusted for both search methods such that user should still be able to see their closest ewaste disposal
- faced issues with data.gov.sg geojson file where json decription of the e-waste locations were
added with html element tags and has a lot of uneccessary information for our daily users.
Went ahead with trimming down the table using substrings to reduce clutter on map.
However, popup html table remains a tad clunky to what is desired. 



# Features:

- allow users to select their current location,
- allow users to key in any location, letting them
plan ahead, especially since e-waste can range in various weights
and sizes which will result in vastly different levels of effort to 
organise its transport. The result would be 2 locations closest related to the search
terms and those 2 locations would be compared by the user respect to with the json file data to visually show closest
e-waste disposal. User will have two destinations with similar names to choose from to reduce 
chance of places with similar names. a limit of more than 2 destinations was found to 
provide data where the destinations were not similar in search terms or were situated in the same area.
- contacts of e-waste disposal also provided to ensure they
do not make a wasted trip. Will recommend to call beforehand before 
heading over. 
1) Existing features: Geolocate appears to work well on chrome browser but faces
issues on safari and firefox. Should not impede on UX too badly if proper if else alerts 
are implemented. 


2) Features left to implement:


# Technologies used:

- jQuery
- mapboxgl
- axios
- bootstrap

# Testing:

# Deployment:

# Credits: 

- content: data.gov.sg
- e-waste icon from https://icons8.com/icons/set/waste
- media: 
- acknowledgements:




Links for later:

https://developers.virustotal.com/reference

https://otx.alienvault.com/api

https://www.mywot.com/wiki/index.php/API

create an interactive website which lets you choose 

https://data.gov.sg/dataset/e-waste-recycling

https://data.gov.sg/dataset/cash-for-trash

https://data.gov.sg/dataset/solid-waste-management-total-non-domestic-waste-disposed-of-per-s-billion-gdp-annual?view_id=154b44b1-3e6e-4faa-9a74-634e4826875e&resource_id=26b692bf-034d-44f5-a6d5-9ad8387f6a6f

https://data.gov.sg/dataset/solid-waste-management-lifespan-of-semakau-landfill-annual

https://data.gov.sg/dataset/resource-conservation-recycling-rate-by-waste-type

https://data.gov.sg/dataset/online-shoppers?view_id=8367f6c6-fc05-4455-8a21-d10dd5cde7e3&resource_id=3038ccbd-a78e-4fbe-a9a4-fde9230f480a

https://data.gov.sg/dataset/solid-waste-management-total-waste-incinerated-annual

Create an ewaste website near you website. 
Followed by simple correlation charts:
1) total waste incinerated, total waste landfill, total waste generated, 
semanku landfill fill estimates - Will be able to draw correlation that we are increasingly 
reliant on incineration for our waste. perhaps able to draw correlation between waste types and 
increases in overall waste. 