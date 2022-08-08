# Notes - add a new functionality

- Example: Create a category crud

## Create file in routes directory
- First, create a file in routes directory, example:
    - categories.js
- Import Router from express and body, header, param...etc from express-validator

- Run Router() function and create the routes for post, get, put, delete, etc..with their access url, like login,
api/auth, etc.

- This router function like post, get, etc., in their parameters they have: the url, 1 to n middlewares(this functions
must have a next()) functions and a callback in the end, witch one is in a controller file.

- And in the of the file, export the Router constant.

## Create a file in controller directory
- First, create a file in controller directory, example:
    - categories.js

- Here we are to create to logical part of the bussines, and we return a response in json format most of the time, this 
responses are sent to the client navigator(or to another server is that was the case)

- There import request and response from express, but mostly for getting the autocomplete functions

- Create the functions according to the necesity of the development, and import some model(collection/schema from 
mongodb) from model directory 

- And in the of the file, export the functions

## Add the route file functionality to the server.js file
- Import the Router function into server.js

- Add the route in the routes method of the server class and associated it to the corresponding path
    - `this.app.use(this.paths.categories, routerCategories);`

- Algo create a propierty in this.paths, example:
    - `categories: '/api/categories'`

## Create model
- In Mongodb compass, create a collection using a json literal object, example:
    ~~~
    ~~~

- In the model directory create a js file with the name(in singular) of the element you want to manage, example:
    - category.js

- Import mongoose class

- 