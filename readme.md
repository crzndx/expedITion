# expedITion CV

Solution to Aufgabe 3. Needs mongodb and nodejs to run.

***

## How to run

Make sure to have installed Node.js from http://nodejs.org/. Check if node is installed via
```javascript
node -v
```
also make sure mongod is running! just type

```javascript
mongod
```

to make it run, if mongodb is correctly defined in your PATH. Also make sure port 27017 is reserved for mongodb.

To start the CV-app type into your console:
```
node app.js
```
the required CV data will be fed from Aufgabe 2's .json file on success.
You may now browse to the CV on http://localhost:8878
