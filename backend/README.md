# Backend for IIT T statistics club

## General Overview:

- The website has two types of users - admin and regular
- Admin users have complete privilege over everything in the website. No data ought to be hidden from them
- Admin users need to log in to access the admin management page
- Regular users have no power to edit any data whatsoever
- Rehular users view the website without logging in

## Guide to source code:

- When a new entity is created, a schema is added in `backend/models`
- The standard CRUD routes are created automatically in `backend/routes/CRUD.js`
- Database login credentials are hardcoded at the backend
- requirements and dependency graph shown in `backend/package.json`

## Models:

### Blogs:

- Each blog is a .pdf file to be displayed on the website when called on by the client
- Blogs are written by authors
- Blogs are tagged by Topic
- Blogs are displayed with date of publication
- Each blog has a thumbnail image
- Blogs link back to the authors' personal page

### Events

- An event is an entity planned to occur at a particular point in space and time
- The locaiton and time are displayed by the website
- The location, time and validity of an event should be editable
- Only upcoming recent events will be shown
- Each event has a promotional poster
- Each event is held by a list of people (points of contact)
