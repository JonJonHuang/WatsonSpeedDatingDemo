# Watson Speed Dating Demo
by Jonathon Huang, Aakash Singh, Stephen Wan, and Andy Wei

## To run the app:
Go into the directory of watsonwebapp, then run the following:
```
npm install
npm start app.js
```
Then, navigate to [http://localhost:3000/](http://localhost:3000/) in the web browser to view the web application.

## Development Notes
The following section includes documentation about the development process of this project. It is not necessary to run these procedures again.

### To initialize the project files:
The following only needs to be run once, in order to quickly setup the Express.js project:
```
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install express-generator -g
express --view=pug watsonwebapp
```

### To set up Mongo database
Go to the [MongoDB Community Server download page](https://www.mongodb.com/download-center?initial=true#community) and install. If you want to you can also install Compass (provides a GUI for MongoDB).

Run
```
mongod.exe -dbpath .../WatsonSpeedFriending/data/db
```
