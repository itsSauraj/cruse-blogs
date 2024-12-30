---
  id: 497dcba3-ecbf-4587-a2dd-5eb0665e6880
  slug: stelth-readme
  title: Stelth Readme
  summary: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  author: "Saurabh Yadav"
  author_email: "sauraj.contact@gmail.com"
  tags: "demo, nextui"
  date: "2024-12-12"
---

<h1 align="center">
Getting started with SphereX
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>
<p align="center">
    <a href="https://www.gnu.org/licenses/gpl-3.0">
      <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
   </a>
</p>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Clone or download
```bash
git clone https://github.com/CodeWithSaurabhYadav/ChatApp
npm i
```

## project structure
```plaintext
LICENSE
README.md
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Dependencies (tech-stacks)
Here's a similar format for the updated dependencies:

### Dependencies (Tech Stacks)

**Client-side** | **Server-side**
--- | ---
@emoji-mart/data: ^1.0.6 | bcryptjs: ^2.4.3
@emoji-mart/react: ^1.0.1 | cors: ^2.8.5
@emotion/react: ^11.10.4 | dotenv: ^16.4.5
@emotion/styled: ^11.10.4 | express: ^4.19.2

My ```package.json```
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "concurrently \"npm run start:client\" \"npm run start:server\"",
    "start:client": "cd client && npm start",
    "start:server": "cd server && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

## Setting Up

### First Lets Download / Install all the required Tooling
#### Install MongoDB

### Rename SERVER/sample.env to (.env) and add your details.


Please install MongoDB using this link
[Click me](https://www.mongodb.com/docs/manual/installation/).
This is just a reference for installation. 
Assuming the following, after installation is complete.

* [ ] TODO
* [x] Completed

```bash
DB_USER=username
DB_PASSWORD=password

DB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@rest_of_connection_string
```
#### Install VSCode or your prefered code editor
I personally prefer VSCode for Development. Feel free to use the code editor of your choice. I find VSCode to have a lot of autoformatting plugins for Development very useful. 

#### Install Postman
+ Postman will be used for API Testing / Development.
+ We will be writing a lot of rest apis, and will add all these to Postman for better management.

#### Install Node
+ Install NVM using this link [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
+ Node will be used for Building React files.
## Code Setup

Available Scripts

In the project directory, you can run the below commant at 3 different places:

The places are as follows

* Root directory (To run both server and client)
* CLIENT's folder (To run client side app)
* SERVER's folder (To run backend api server ) 


***
**Command** ```npm start```
But before this you need to run ```npm i``` in all the three locations above

***
```npm start``` Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## ```npm run build```

Builds the app for production to the ```build``` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### Update Configs

Go to ```~\CLIENT\src\config.js``` file. Add the necessary details. 
```bash
export const S3_BUCKET_NAME = 'project-dev';
export const AWS_ACCESS_KEY = '';
export const AWS_SECRET_ACCESS_KEY = '';
export const AWS_S3_REGION = 'ap-south-1';
```
Then,
Go to `~\SERVER\.env`. Create one if not already present. You can copy one of the existing file (`SERVER\sample.env`) and change the name and properties in place.

***
Kindly note: NODE_ENV=development/production

* development:- This logs the emails data into the server terminal, and also logs necessary details for debuging.
* production:- Does not log any data. So, it is not useful fot production
***