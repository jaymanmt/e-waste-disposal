# Interactive Front-End Project
## e-waste drop-off

This website is catered mainly for users situated in Singapore to access location data on where to responsibly dispose of their e-waste by providing a map-based interactive visualisation.
The secondary purpose of this project is to raise awareness of the inefficacies of recycling, particularly in Singapore. 

This webpage will be using data from the Singapore Government. The json files have been downloaded and uploaded manually. Therefore, although the website is designed to be used specifically in Singapore, it should be able to be used by overseas users. 
<hr>

#### UX:
**<u>Strategy</u>**

With electronics integrated in the average life of a typical Singapore resident, this website is intended to help them quickly find a solution to dispose of their many devices that might be old or unusable. Getting rid of elecronics can be draining and a seemingly redundant task for most and thus, the landing page of the website is an interactive map, with all e-waste locations loaded right away. It also provides features to help users locate their current position and search for train stations to plan a trip that will cater to their individual conveniences.
To fulfill the secondary purpose of the project, the website takes the opportunity of the incoming user traffic to convert individuals already keen on being environmentally friendly in taking another step further to reduce waste in their overall lifestyles. This is done by adding more information on e-waste as well as interactive charts to educate them on the inadequate waste management currently present in Singapore. 

**<u>Scope</u>**

Will include maps to find closest ewaste locations and their own current location. Also include charts to visually portray different perspective of total waste and waste disposal methods in Singapore. 

**<u>Structure</u>**

Navigation needs to extremely intuitive and simplistic with a standard mobile responsive navigation bar. Also will use Single Page Application to reduce loading time when navigating between pages. 
You can find the link to my initial wireframe [here.](https://github.com/jaymanmt/e-waste-disposal/blob/master/wireframe/Interactive%20Development%20Project.png)

**<u>Skeleton</u>**

Each page is structured to quickly feature the highlights of the pages at the top, such as maps and charts. This is to be considerate to users' time as well as to capture their attention to get a message across. The maps and charts are interactive to allow users to navigate further and intuitively gain an understanding into how the webpage works.

**<u>Surface</u>**

Color Schemes and font in the first two pages were off-white and dark blue to illustrate an "old electronic" theme for users who come and go. A darker background-color in the charts sections is used to illuminate the color vibrancy of the charts as well as to set a more negative vibe related to the relatively negative message that the charts will be telling. 


<hr>

#### Features:

1) <u>Navigation:</u>
- Single Page Application &rarr; preloads data to avoid long loading times during navigation
- Mobile Responsiveness &rarr; allow mobile device users to enjoy an equally quality UX and UI.

2) <u>Maps:</u>

***used mapboxgl and foursquare*
- Search Box with zoom functionality &rarr; allow users to key in any shopping mall, followed by a zoom close enough to let them look for the closest walkable e-waste disposal unit. This will let them better plan their journey for the day.
- Search Dropdown Box for Train Stations &rarr; allow users to more easily search for train stations which is the primary form of transport for most Singapore residents. Dropdown menu gives desktop users a speedier search by including an in-built type-to-search feature. 
- Button to display imagery of a typical ewaste disposal unit &rarr; Button has the e-waste map marker icon on it to hint to users that it is an assistance tool to identify an ewaste disposal unit. When they click on it, they will realise immediately that it shows how a real e-waste unit looks like so that they can locate it quickly when onsite. It also informs users to turn on location services on their browsers and devices should they wish to activate the Geolocate functionality of mapbox. 
- Geolocate on mapboxgl &rarr; allow users to find their current location on the map
- Map marker popups &rarr; displays information about the selected location to improve ease of access. Using the Singapore Government's standard html format for the mapbox marker popup due to the html structure and styling already hard-coded into the json file. The map marker popup for train stations, includes the name of the train station as well as the color-code of the line itself to make up for the lack of in-built map markers for public transport. 

3) <u>Charts:</u>

***used dc.js, d3.js, crossfilter and axios*
- Bar Chart interactive with a pie chart &rarr; give users a quick insight into Singapore's total waste output per year and an overview of how it is being managed. Clicking on individual bars on the bar chart for each year from 2000 - 2015, will show a trend per year on the pie chart of a growing distribution rate for recycling from ~50% to ~60%. Clicking on each recycling method on the pie chart will also show on the bar chart. For example, an increase in total waste being recycled over the past 16years while landfill and incineration has been relatively stagnant.
- Composite Multi-line Chart &rarr; shows recycling rates (%) over a period of 16 years to reveal Singapore's progress in dealing with each material type. Hovering over individual material type on the legends section, increases the color contrast to highlight the data of that particular material over the timeline. A complementary color scheme was chosen for materials that were less related or out of control for the typical consumer, while contrasting colors were used for materials that are commonly used by consumers. For example, construction debris and ferrous metals used a shade of a lighter color, blue. Meanwhile, plastics, cardboard and food have popping and contrasting colors such as red and green. The intention is to make it easier for consumers to visualise the direct impact of their behaviours on waste output. 
- Row Chart interactive with multi line chart &rarr; color scheme of each material matches that of the line chart to help visualise individual relationships between average waste/year and its recyclability over 16years. For example, an average of 48.56 million tonnes of paper/cardboard and 10.5 million tonnes of plastic waste is thrown away every year and yet, recycling rates remained mostly unchanged over a course of 16years. This row chart can be also be used to help navigate on the composite line chart by clicking the row rectangles to compare and contrast selected materials' recycling rates. For example, clicking on the plastic and glass rows to collapse everything else on the line chart and thus, easily comparing only the plastic and glass recycling rates.

##### Features left to implement:
- add click functionality to allow mobile device users to view the values of individual bars and rows of the charts as they are unable to "hover" to view them.
- changing cursor to a pointer style on ewaste locations on the map
- add animation for markers upon search button being clicked.
- add enter key functionality to the "go" buttons for better UI/UX experience on desktop. 
- Button animation of map search boxes do not look as appealing on mobile devices. More visual customisation required.

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
- Google Fonts &rarr; for text on navigation pane.

<hr>

#### Testing:
**No automated testing for this project

**Only manual testing conducted for this project.
- Quickly switching between navigation on pages with maps resulted in a major slowdown of the webpage due to the re-loading of all charts upon clicking the navigation. The problem was fixed upon page refresh but it was noticed that when the window was open for an extended period of time navigating between pages (~15mins), loading time between pages slowed down permanently. Charts reload upon click was implemented to boost UX due to the animations when the dc charts are accessed by the user, and to reset the user's interactive settings on the charts when he navigates from page to page. - Prioritising a swift and smooth UI/UX, the problem was fixed by removing the click functionality for chart reload such that the charts just needed to load once upon webpage request. 
- When search field for malls is left empty and the search button was clicked mutliple times, nothing happens - verified.
- Alternating between both mall search and train station search causes no glitches - verified.
- Quickly switching all types of location markers, mapbox fly-to functionality working after extended use - verified.
- Making multiple selections across the interactive charts in different orders had no problems - verified. 
- All external links in the webpage works - verified.


##### Mobile responsiveness Testing
<u>Testing on Desktop:</u> 
- Google Chrome, Firefox, Safari and Microsoft Edge browsers had no issues loading and navigating through the webpage including maps except a minor glitch. When the browser window is resized on a page other than the map-page, the map does not display correctly when navigated back to it. A manual window size adjust of the map page itself or a page refresh fixes the issue. A fix for this bug couldn't be found. Taking into consideration the rare occurences of a user resizing windows during the use of other pages followed by going back to the maps, I chose not to consume excessive amounts of time fixing this bug and postpone it to later date. 
- Geolocate functionality of mapboxgl worked on firefox, chrome and safari. It is noticed that the browser settings must be set to NON-private and have location services enabled. And when using safari browser, the apple device's settings must have "location services" enabled in order for Geolocate to work. Therefore, user instructions on location privacy settings were added to the modal which shows e-waste disposal demo image. 
- Having more than one search result for the mall's search box was found to provide irrelevant data where the destination results were often not relevant to search terms and also not situated in the same area. Therefore, a limit of one search result per search was implemented to avoid user confusion. Search boxes were adjusted to recommend for only train stations or shopping malls to push for the most accurate search results from foursquare.
- A pre-defined html table is given within the geojson file from data.gov.sg. The size of the table contained uneccessary information which also consumed a lot of the space on the map. String splicing was used to reduce the size of the the table as much as possible without removing crucial data such as address details etc. Popup html table remains overly clunky to what is desired. A new json file could have been created to accommodate for a 100% customisable marker popup, but weighing the time and effort vs the small aesthetics gain upon completion, it was decided to use the given json data structure as it is,  mainly for longevity purposes when new json files are released by the source that may change the format or structure of the json file. 
- Hero image for e-waste segment appeared blurred and zoomed in on iOs mobile devices. A media query with background-attachment property of scroll was added to resolve it.

<u>Browser inspector for Mobile Devices were used and tested virtual devices ranging from iPhones and iPads to Samsung Galaxy:</u>

Google chrome inspector:
- Elements were appropriately sized well and website functionality unchanged. 
- Map was able to be navigated around by dragging the cursor. 

Firefox inspector: 
- Elements were appropriately sized well and website functionality unchanged except that the maps could not be navigated by dragging the cursor.

Testing on Mobile Devices including iPhone 7 and Samsung Galaxy S9:
- Elements were appropriately sized well and website functionality unchanged. 
- Map was able to be navigated around by dragging the cursor. 


<hr>

#### Issues:

x-axis labels on the charts of the last page(row chart and composite line chart) do not show after deployment despite showing up in previews during the website development. A higher z-index was added, and font-size was adjusted, but it continues to not show up after deployment. 

 
<hr>

#### Deployment:

Github repository named "e-waste-disposal" was created for this project and regular commits have been made to display progress of the website over a period of time. 

Since Github was the chosen host platform for this repository, GitPages was a convenient and reliable tool to deploy this website publicly. The site is deployed directly from the master branch and GitPages update automatically upon new commits.

You can do a git pull to run the files on a server. 

The link to the webpage can be found [here.](https://jaymanmt.github.io/e-waste-disposal/)

<hr>

#### Credits:

##### Content:

**Charts' data can be also found within the credits below:
(Note: For the charts data references, as the resource is from the Singapore Government, foreign access may be limited or totally inaccessible.)

- Total waste recycled by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-recycled)

- Total waste incinerated by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-incinerated-annual?view_id=882ae208-bd25-4b99-8cc9-a3b7b24d063a&resource_id=e4c8461f-e7de-4fc3-ad25-cf068ae09509)

- Total waste landfilled by [data.gov.sg](https://data.gov.sg/dataset/solid-waste-management-total-waste-landfilled-annual)

- Recycle Rate Distribution by [data.gov.sg](https://data.gov.sg/dataset/resource-conservation-recycling-rate-by-waste-type)

 - Text in "The Truth" section about Recycling rates over 2017 and 2018 remain largely unchanged is by [National Environment Agency](https://www-nea-gov-sg-admin.cwp.sg/docs/default-source/our-services/waste-management/waste-stats---2003---2017e44f4011546a42c2b736db5193758791.pdf)
 - All text in "e-waste?" section by [National Environment Agency](https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/e-waste-management)
 - Information about Singapore's incineration waste management is by [Ministry of the Environment and Water Resources](https://www.mewr.gov.sg/topic/incineration)
 - Locations and Names of Singapore Train Stations by [data.world](https://data.world/)

##### Media:
- ewaste marker icon from [icons8.com](https://icons8.com/icons/set/waste)

- red marker icon from [icons8.com](https://icons8.com/icons/set/mall)

- mall marker icon from [icons8.com](https://icons8.com/icons/set/marker)

- ewaste hero image on "e-waste?" section: Photo by Jonathan Borba on Unsplash

- current location arrow icon from [fontawesome.com](https://fontawesome.com/)

##### Acknowledgements:
- Learning Resource by Code Institute on "custom reduce for charts" for manually calculating and expressing the average waste/year on the row chart was extremely helpful.