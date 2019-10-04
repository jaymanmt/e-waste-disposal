# Interactive Front-End Project
#### Project-Name: e-waste drop-off
This website will quickly allow users situated in Singapore to access data on where to responsibly dispose of e-waste by providing a map-based interactive visualisation. 
The secondary purpose of this project is to raise awareness of the inefficacies of recycling, especially in Singapore. 

<hr>

#### UX:
With electronics integrated in the average life of a typical Singapore resident, this website is intended to help them quickly find a solution to dispose of their many devices that might be old or unusable. Getting rid of elecronics can be draining and a seemingly redundant task for most and thus, the landing page of the website is maps, with all e-waste locations loaded right away. It also provides features to help users locate their current position and set destinations to cater to their individual convenience.  

You can find the link to my initial wireframe [here.](https://github.com/jaymanmt/e-waste-disposal/blob/master/wireframe/Interactive%20Development%20Project.png)

<hr>

#### Features:

1) <u>Navigation:</u>
- Single Page Application &rarr; preloads data to avoid long loading times during navigation
- Mobile Responsiveness &rarr; allow mobile device users to enjoy an equally quality UX and UI.

2) <u>Maps:</u>

***used mapboxgl and foursquare*
- Search Box with zoom functionality &rarr; allow users to key in any shopping mall, followed by a zoom close enough to let them look for the closest walkable e-waste disposal unit. This will let them better plan their journey for the day.
- Search Dropdown Box for Train Stations &rarr; allow users to more easily search for train stations which is the primary form of transport for most Singapore residents. Dropdown menu gives desktop users a speedier search by having an in-built type search feature. 
- Button to display imagery of a typical ewaste disposal unit &rarr; allow users to identify what an ewaste disposal unit looks like so they can locate it quickly when onsite. It also informs users to turn on location services should they wish to activate the Geolocate functionality of the map.
- Geolocate on mapboxgl &rarr; allow users to find their current location on the map
- Popups &rarr; displays information about the selected location to improve ease of access. 

3) <u>Charts:</u>

***used dc.js, d3.js, crossfilter and axios*
- DC Stacked Bar Charts &rarr; give users a quick insight into Singapore waste management practices including recycling. 
- DC Row Chart &rarr; reveals recycling rates for each material. Hovering over individual portions of the charts reveals the values of that particular segment.

##### Features left to implement:
- add click functionality to allow mobile users to view the values of individual bars and rows of the charts.
- changing cursor to pointer on ewaste locations on the map
- add animation for markers.

<hr>

#### Technologies used:
- HTML
- CSS
- Javascript
- jQuery &rarr; Simplify DOM manipulation
- mapboxgl &rarr; Provides simple locating services without routing required
- axios &rarr; intuitive data retrieval syntax. 
- bootstrap &rarr; for the barebones navbar and drop-down components
- d3, dc, crossfilter
- foursquare &rarr; provides basic search library for high frequency destinations such as malls and train stations
- data.gov.sg &rarr; provided the geojson file to retrieve data of ewaste locations
- data.world &rarr; provided the csv file to retrieve location and names of train stations in singapore

<hr>

#### Testing:

<u>Desktop:</u> 
- Google Chrome, Firefox, Safari and Microsoft Edge browsers had no issues loading and navigating through the webpage including maps except a minor glitch. When the browser window is resized on a page other than the map-page, the map does not display correctly when navigated back to it. A manual window size adjust of the map page itself or a page refresh fixes the issue. A fix for this bug couldn't be found. Taking into consideration the rare occurences of a user resizing windows during the use of other pages followed by going back to the maps, I chose not to consume excessive amounts of time fixing this bug and postpone it to later date. 
- Geolocate functionality of mapboxgl worked on firefox, chrome and safari. It is noticed that the browser settings must be set to NON-private and have location services enabled. And when using safari browser, it is the apple device's settings that must have "location services" enabled in order for Geolocate to work.
- Having more than one search result for the mall's search box was found to provide irrelevant data where the destination results were often not relevant to search terms and also not situated in the same area. Therefore, a limit of one search result per search was implemented to avoid user confusion. Search boxes were adjusted to recommend for only train stations or shopping centres to push for the most accurate search results from foursquare.
- A pre-defined html table is given within the geojson file from data.gov.sg. The size of the table contained uneccessary information which also consumed a lot of the space on the map. String splicing was used to reduce the size of the the table as much as possible without removing crucial data such as address details etc. Popup html table remains overly clunky to what is desired. 
- Hero image for e-waste segment appeared blurred and zoomed in on iOs mobile devices. A media query with background-attachment property of scroll was added as a media query. 

<u>Browser inspector testing for Mobile Devices were used and tested devices ranging from iPhones andd iPads to Samsung Galaxy:</u>

Google chrome inspector:
- Elements were appropriately sized well and website functionality unchanged. 
- Map was able to be navigated around by dragging the cursor. 

Firefox inspector: 
- Elements were appropriately sized well and website functionality unchanged except that the maps could not be navigated by dragging the cursor.

Mobile Devices including iPhone 7 and Samsung Galaxy S9:
- Elements were appropriately sized well and website functionality unchanged. 
- Map was able to be navigated around by dragging the cursor. 

<hr>

#### Deployment:

Github repository named "e-waste-disposal" was created for this project and regular commits have been made to display progress of the website over a period of time. 

Since Github was the chosen host for this repository, GitPages was a convenient and reliable tool to deploy this website publicly. The site is deployed directly from the master branch and GitPages update automatically upon new commits.

The link to the webpage can be found [here.](https://jaymanmt.github.io/e-waste-disposal/)

<hr>

##### Content:

Chart data can be found below:

- Total waste recycled by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-recycled)

- Total waste incinerated by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-incinerated-annual?view_id=882ae208-bd25-4b99-8cc9-a3b7b24d063a&resource_id=e4c8461f-e7de-4fc3-ad25-cf068ae09509)

- Total waste landfilled by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-landfilled-annual)

- Recycle Rate Distribution by [data.gov.sg](https://data.gov.sg/dataset/resource-conservation-recycling-rate-by-waste-type)

 - Text in "The Truth" section about Recycling rates over 2017 and 2018 remain largely unchanged is by [National Environment Agency](https://www-nea-gov-sg-admin.cwp.sg/docs/default-source/our-services/waste-management/waste-stats---2003---2017e44f4011546a42c2b736db5193758791.pdf)
 - All text in "e-waste?" section by [National Environment Agency](https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management)
 - Locations and Names of Singapore Train Stations by [data.world](https://data.world/)

##### Media:
- map marker icons from [icons8.com](https://icons8.com/icons/set/waste)

- ewaste hero image on "e-waste?" section: Photo by Jonathan Borba on Unsplash

- current location arrow icon from [fontawesome.com](https://fontawesome.com/)

