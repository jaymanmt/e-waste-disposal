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
organise its transport. The result would be 1 location closest related to the search
terms and that location would be compared visually on the map by the user with respect to with the json file data
to find closest e-waste disposal. 
1) Existing features: Geolocate for user's current location.


2) Features left to implement:


# Technologies used:

- jQuery
- mapboxgl
- axios
- bootstrap

# Testing:
1. Google chrome's mobile responsive inspector:
- Website was able to navigate around the map by dragging the cursor. 
- width of the table elements obtained from external json file has glitches with table overextending through the popup content window.
2. Firefox mobile responsvive inspector: 
- Website was not able to navigate around the map by dragging the cursor.
- width of table elements obtained from external json file seem to be free of glitches.
3. Mapbox's Geolocate functionality appears to work well on google chrome browser but faces
issues on safari and firefox. Should not impede on UX if proper 'if else statement' alerts 
are implemented. 
4. A limit of more than one search result was found to provide inaccurate data where the destinations were not similar or were not situated in the same area.
Therefore, a limit of one search result per search was implemented to avoid confusion. 
And added to recommend to entire closest mrt or shopping centre for most accurate search results.


# Deployment:

# Credits: 

- content: data.gov.sg
- e-waste icon from https://icons8.com/icons/set/waste
- media: 
- acknowledgements:




useful links :

https://developers.virustotal.com/reference

https://otx.alienvault.com/api

https://www.mywot.com/wiki/index.php/API

create an interactive website which lets you choose 

https://data.gov.sg/dataset/e-waste-recycling

https://data.gov.sg/dataset/solid-waste-management-total-non-domestic-waste-disposed-of-per-s-billion-gdp-annual?view_id=154b44b1-3e6e-4faa-9a74-634e4826875e&resource_id=26b692bf-034d-44f5-a6d5-9ad8387f6a6f

https://data.gov.sg/dataset/solid-waste-management-lifespan-of-semakau-landfill-annual

https://data.gov.sg/dataset/resource-conservation-recycling-rate-by-waste-type

https://data.gov.sg/dataset/online-shoppers?view_id=8367f6c6-fc05-4455-8a21-d10dd5cde7e3&resource_id=3038ccbd-a78e-4fbe-a9a4-fde9230f480a

https://data.gov.sg/dataset/solid-waste-management-total-waste-incinerated-annual

To dos for maps:
customise markers, add usable mapbox features, find better background colors for popups both for
json data and the search terms. 
Add second layer for instructions? 


Total waste disposed of:
https://data.gov.sg/dataset/solid-waste-management-total-domestic-waste-disposed?view_id=f83aa272-974c-4c0f-b6d9-421c1eb200fe&resource_id=2c6749c6-8271-4281-97ff-fb089cccf0c4
Total waste recycled:
https://data.gov.sg/dataset/solid-waste-management-total-waste-recycled
Total waste incinerated:
https://data.gov.sg/dataset/solid-waste-management-total-waste-incinerated-annual?view_id=882ae208-bd25-4b99-8cc9-a3b7b24d063a&resource_id=e4c8461f-e7de-4fc3-ad25-cf068ae09509
Total waste landfilled:
https://data.gov.sg/dataset/solid-waste-management-total-waste-landfilled-annual

--> Digging deeper --> recycling by type. What appears on the surface is not what it seems.
https://data.gov.sg/dataset/resource-conservation-recycling-rate-by-waste-type

--> Recyling by type over 2017 and 2018 remain largely unchanged:
https://www-nea-gov-sg-admin.cwp.sg/docs/default-source/our-services/waste-management/waste-stats---2003---2017e44f4011546a42c2b736db5193758791.pdf

Create an ewaste website near you website. 
Followed by simple correlation charts:
1) total waste incinerated, total waste landfill, total waste generated, 
semanku landfill fill estimates - Will be able to draw correlation that we are increasingly 
reliant on incineration for our waste. perhaps able to draw correlation between waste types and 
increases in overall waste. 