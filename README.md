# Fitr Iteration 1

Fitr is an IOS application developed using the MERN stack. Evidently, this repo is divided into two different sub-repos: 'backend' and 'mobile'.

#### Backend 
Backend is the server that provides all the APIs that the frontend will utilize to satisfy user's request.

#### Mobile
Mobile is the folder where our mobile app resides in. 


## Requirement
- You need Node.js installed on your machine. We prefer to use the latest version of Node. 
- You need to have Expo Cli installed on your machine
   `npm install -g expo-cli`
- You need an IOS device (Iphone) with Expo Go installed.

(If having trouble running the app, please check this link :https://reactnative.dev/docs/environment-setup out)



## Getting Started

To use our application, you need to run both the server and the mobile on your computer.

#### Server
You need to first go into the 'backend' folder.\
`cd backend`\
Then, install all dependencies (Skip this step if already ran it)\
`npm install` \
Finally, run the server\
`node server.js`

#### Mobile
In **another terminal**, we will run the mobile app host.\
First, go into the mobile folder.\
`cd mobile`\
Then, install all dependencies (Skip this step if already ran it)\
`npm install` 

Currently the backend and frontend APIs are not integrated, so we have static dummy data that is being displayed on the front end. However, all backend APIs are functioning, which can be tested on Postman or another testing platform.

Run the expo server\
`npm start`

When your browser opens with QR code displayed, scan the QR code with your Iphone camera app, and click when redirection appears.\
You will then be lead to the Expo app and you App should be running.


## Test
Make sure that Jest is installed (should be installed when npm install).\
`npm test`
