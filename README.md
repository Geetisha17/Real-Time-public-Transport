
# Smart Commute

This project is a full-stack mobile application built with React Native (Expo) and Node.js, designed to streamline urban commuting using real-time transit data. The app fetches live positions of public transport vehicles (buses, metros, trains) across Delhi using the Open Transit Delhi API, offering users up-to-date location tracking and expected arrival times.

Beyond real-time transport tracking, the app empowers users with
-	Route search from one place to another
-	Nearby transit discovery (based on selected location)
-	Crowd reporting at stations
-	Emergency alerts for staff or transit-related issues
-	System-wide alerts pushed and viewed in-app

It uses Redis for optimized caching and performance and the backend is containerized using Docker for smooth deployment and scalability.




## Features

### Route Search with Smart Suggestions

Users can input a source (From) and destination (To) to fetch optimal public transport routes. The system supports multiple transit modes such as bus, metro, train, and walking. Results include step-by-step instructions, travel duration, and route polyline visualization. Smart suggestions improve usability by offering likely matches and reducing entry errors.





### Live Metro & Bus Tracking (Real-Time API Integration)

The app integrates with the Open Transit Data Delhi (OTD) real-time feed to display current locations of buses and metros on a map. It provides:

	-	Vehicle IDs
	-	Estimated Arrival Times
	-	Route IDs
	-	Nearest Stop Names
	-	Speed and coordinates of vehicles





### Real-Time Alerts Feed

A dynamic alert system shows live updates for:

	-	Crowd surges
	-	Delays
	-	Breakdowns
	-	Construction notices

Alerts are visible in a dedicated screen and can be filtered by type. Users can report incidents directly from their devices, contributing to a crowdsourced public transport intelligence system.




### Emergency Help Locator

The app includes a dedicated Emergency screen that uses the Google Places API to fetch nearby:

	-	Hospitals
	-	Police Stations
	-	Doctors/Clinics

Location is either based on the user’s current position or the route’s starting point, helping travelers locate help quickly in case of any urgent situations. 


### User-Reported Crowd System

Users can submit reports on overcrowded stations or stops. These reports are tied to specific route stops and are:

	-	Collected via a dedicated form screen
	-	Stored in the backend with timestamps
	-	Shown alongside route steps to warn upcoming travelers

This system creates a feedback loop between users, making it a collaborative crowd-monitoring network.



### Redis-Powered Caching for Performance

Redis is used across the backend to reduce latency and boost performance. Key areas include:

	-	Emergency Places (based on lat/lng)
	-	Real-Time Vehicle Feeds (cached for 15–30 seconds)
	-	Static GTFS Data
	-	Route ID → Route Name
	-	Stop ID → Stop Name

Caching minimizes redundant API calls and speeds up response times, which is crucial for mobile performance and scalability.


## Tech Stack

**Frontend** : React Native (Expo)

**Backend** : Node.js + Express

**Database**: MongoDB

**Caching**: Redis


**APIs Used**:

	-	Google Directions & Places API
	-	Open Transit Delhi API
	-	Google Geocoding API


## Demo
https://drive.google.com/file/d/1KozmVOhwq7itgSL0GWv_60EkRnM2IUbx/view?usp=sharing

## Backend Setup

```
cd backend 
npm install
touch .env
## Add variables
node server.js

```
---
## Frontend Setup

```
cd frontend 
npm install
npx expo start
```

---

## Docker Setup

```
docker-compose up --build
## for redis
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_API_KEY`

`OTD_API_KEY`

`MONGO_URI`

`REDIS_URL`


