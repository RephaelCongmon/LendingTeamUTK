# ScootLib

### Team Members:
- Tyler Nguyen
- Rephael Congmon
- Abhi Ravi
- Kishan Tailor

## Inspiration
The inspiration for this application stems from the use of the team's frequent use of scooters. We had many problems with our commutes as well as finding adequate parking areas due to restricted infrastructure. We hope that this application can help the City of Knoxville direct their efforts in helping those who frequent the use of scooters in the Scruffy City.

## What it does
ScootLib comes with the feature to display scooter transit routes via a heat map as well as a feature to view clusters of endpoints that display areas of high-volume destinations. Conclusions that can be drawn from the maps include:
- What routes do knoxvillians enjoy scooting the most
- What routes are dead spots for scooter traffic and why that might be
- What areas could we implement more for scooter safety
- Mappings to solve issues of scooter parking locations
- Points of interest that contain high scooter traffic
- Area where scooters should likely be moved to for optimal use


## How we built it
Heroku -> Node.js + Express.js -> Map API’s -> Website (HTML, CSS, JavaScript).
To host the website for free, we used Heroku to service a web app. We decided on Heroku because Heroku provided many out-of-the-box solutions and also has the capability for full-stack development with Node.js.  For the frontend, we decided to use Twitter Bootstrap for ready-to-use CSS classes. For the backend we used express.js to help communicate with our backend to provide database accessibility. Lastly, we used the Google Web API paired with the given Knoxville Dataset to help populate and provide meaningful information to our web application.

## Challenges we ran into
Some of the problems that forced our team to stretch further than expected was trying to render and configure the Google Maps API on our website, but we overcame that through spending copious amounts of time analyzing the documentation. Also as students, we never experienced such a high volume of data so it did take a lot of learning to be able to manage the data.

## Accomplishments that we're proud of
Our team delivered more than a minimum viable product that was able to clearly and efficiently portray the City of Knoxville’s scooter data in an easily digestible manner. Moreover, we were able to analyze the data into nodes and points of interest to help draw conclusions that otherwise would not be evident. Furthermore, my group was able to manage data that was well over what we would consider in our comfort zone. Lastly, we were also proud of the fact that we built an application that has the potential to solve some of the problems that we have on a daily basis.

## What we learned
We learned a variety of skills relating to front-end and back-end development such as html/css, Bootstrap and Express. Furthermore we learned more about  API work, as well as more advanced javascript. We also learned a lot about managing large data sets. Furthermore, we learned a lot about how to use the Google Maps API as well as working with GeoJSON data.

## What's next for ScootLib
Scootlib looks to expand upon and draw more conclusions from the data currently available. We look to add algorithms that expand upon where scooter users were intending to visit as well as increasing the data capacity of our website while maintaining its efficiency. A potential idea would be to use the Google Places API to find the most popular point of interest for every cluster of scooter parkings.

