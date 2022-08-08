# webserver + restserver + mongodb + jwt + google sign-in

- To rebuild the modules of node:
- `npm install`

## Mongodb
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) -> create a account
- Create new proyect
- Creae new database
- Create new cluster
- Create user, add the credencials(MONGODB_CNN) in .env file
- Connect by Mongo Db Compass
- Start mongodb compass y use the connection string

### Collections Mongodb:
- roles
~~~
{
    "role": "ADMIN_ROLE"
}

{
    "role": "USER_ROLE"
}

{
    "role": "SALES_ROLE"
}
~~~
- users
~~~
{
    "name": "",
    "email": "",
    "password": "",
    "role": "",
    "status": true,
    "google": false
}
~~~

## URL BASE:

- http://localhost:8080

### Methods:
---

#### GET:
- Generate a auth token
    - /api/auth/login

- Request(application/json):
~~~
{
    "email": "test1@email.com",
    "password": "123456"
}
~~~

- Response:
~~~
{
    "user": {
        "name": "Test 1",
        "email": "test1@email.com",
        "role": "USER_ROLE",
        "status": true,
        "google": false,
        "uid": "62def8450c05a19c9b1bd10c"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmRlZjg0NTBjMDVhMTljOWIxYmQxMGMiLCJpYXQiOjE2NTg5MzI3OTksImV4cCI6MTY1ODk0NzE5OX0.EWohoZg8RYAFYa4UsQhVV9RbNaBfLmfBy6grGGn5yOs"
}
~~~

#### DELETE:
- To delete a user(change their status to false)
    - /api/users/:id
    - Example: /api/users/62df25fe7611d7ac5beb291d

- Request(headers):
~~~
jwt-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MmRlZjg0NTBjMDVhMTljOWIxYmQxMGMiLCJpYXQiOjE2NTg5MzI3OTksImV4cCI6MTY1ODk0NzE5OX0.EWohoZg8RYAFYa4UsQhVV9RbNaBfLmfBy6grGGn5yOs
~~~

- Response:
~~~
{
    "name": "Test 2",
    "email": "test2@email.com",
    "role": "USER_ROLE",
    "status": false,
    "google": false,
    "uid": "62df25fe7611d7ac5beb291d"
}
~~~

# category + products
---

## Get categories
- Request:
    - Get
    - /api/categories
- Response:
~~~
{
    "total": 7,
    "categories": [
        {
            "name": "SCREAM",
            "user": {
                "name": "Test 1",
                "email": "test1@email.com",
                "uid": "62def8450c05a19c9b1bd10c"
            },
            "_id": "62e2e4880933cae7d9a8f835"
        },
        ...
    ]
}
~~~
## Get category by id
- Request:
    - Get
    - /api/category/:id
- Response:
~~~
{
    "name": "COOKIES - UPDATE",
    "user": {
        "name": "Test 1",
        "email": "test1@email.com",
        "uid": "62def8450c05a19c9b1bd10c"
    }
}
~~~
## Create a category
- Request:
    - Post
    - /api/category
    - header: 
    ~~~
    jwt-token: foo-bar-123
    ~~~
    - body(json):
    ~~~
    {
        "name": "Sushi"
    }
    ~~~
- Response:
~~~
{
    "name": "SUSHIPLETO",
    "user": "62def8450c05a19c9b1bd10c"
}
~~~

## Update a category by id
- Request:
    - Put
    - /api/category/:id
    - header:
    ~~~
    jwt-token: foo-bar-123
    ~~~
    - body(json):
    ~~~
    {
        "name": "Sushi 2"
    }
    ~~~
- Response:
~~~
{
    "name": "COOKIES - UPDATE 2",
    "user": {
        "name": "Test 1",
        "uid": "62def8450c05a19c9b1bd10c"
    }
}
~~~
## Delete a category by id
- Request:
    - Delete
    - /api/category/:id
    - header:
    ~~~
    jwt-token: foo-bar-123
    ~~~
- Response:
~~~
{
    "name": "COOKIES - UPDATE 2",
    "user": "62def8450c05a19c9b1bd10c"
}
~~~
## Get products
- Request:
    - Get
    - /api/products
- Response:
~~~
{
    "total": 8,
    "products": [
        {
            "name": "PRODUCT 3",
            "price": 0,
            "available": true,
            "user": {
                "name": "Test 1",
                "email": "test1@email.com",
                "uid": "62def8450c05a19c9b1bd10c"
            },
            "category": {
                "name": "SCREAM"
            }
        },
        ...
    ]
}
~~~
## Get product by id
- Request:
    - Get
    - /api/product/:id
- Response:
~~~
{
    "name": "PRODUCT 8 - UPDATED 2",
    "price": 1800,
    "description": "Description Product 8",
    "available": true,
    "user": {
        "name": "Test 1",
        "uid": "62def8450c05a19c9b1bd10c"
    },
    "category": {
        "name": "SCREAM"
    }
}
~~~

## Create a product
- Request:
    - Post
    - /api/product
    - header:
    ~~~
    jwt-token: foo-bar-123
    ~~~
    - Request
    - body(json): 
    ~~~
    {
        "name": "Barros luco",
        "description": "Tomate, queso, carne, orégano",
        "price": 1100,
        "available": true,
        "category": "62e2e4900933cae7d9a8f839"
    }
    ~~~

- Response:
~~~
{
    "name": "BARROS LUCO 2",
    "price": 1100,
    "description": "Tomate, queso, carne, orégano, aceitunas",
    "available": true,
    "user": "62def8450c05a19c9b1bd10c",
    "category": "62e2e4900933cae7d9a8f839"
}
~~~

## Update a product by id
- Request:
    - Put
    - /api/product/:id
    - header:
    ~~~
    jwt-token: foo-bar-123
    ~~~
    - body(json):
    {
        "name": "Product 8 - updated 2",
        "description": "Description Product 8",
        "price": 1800,
        "available": true
    }
- Response:
~~~
{
    "name": "PRODUCT 8 - UPDATED 3",
    "price": 2500,
    "description": "Description Product 8",
    "available": true,
    "user": {
        "name": "Test 1",
        "uid": "62def8450c05a19c9b1bd10c"
    },
    "category": {
        "name": "SCREAM"
    }
}
~~~

## Detele a product by id
- Request:
    - Delete
    - /api/product/:id
    - header:
    ~~~
    jwt-token: foo-bar-123
    ~~~
- Response:
~~~
{
    "name": "PRODUCT 7 - UPDATED 2",
    "price": 1400,
    "available": false,
    "user": "62def8450c05a19c9b1bd10c",
    "category": "62e2e4880933cae7d9a8f835"
}
~~~

## Search
- /api/search/:collection/:term
---
## Search collections:
### users 
- Request:
    - Get
    - /api/search/users/foo-123
    - /api/search/users/Test 1
- Response:
~~~
{
    "total": 1,
    "results": [
        {
            "name": "Test 1",
            "email": "test1@email.com",
            "role": "ADMIN_ROLE",
            "status": true,
            "google": false,
            "uid": "62def8450c05a19c9b1bd10c"
        }
    ]
}
~~~
### categories:
- Request:
    - Get
    - /api/search/categories/foo-1234567
    - /api/search/categories/Pizzas
- Response:
~~~
{
    "total": 1,
    "results": [
        {
            "name": "PIZZAS",
            "user": "62def8450c05a19c9b1bd10c"
        }
    ]
}
~~~

### products
- Request:
    - Get
    - /api/search/products/napolitana
    - /api/search/products/foo-1234567
- Response:
~~~
{
    "total": 1,
    "results": [
        {
            "name": "NAPOLITANA",
            "price": 1100,
            "description": "Tomate, queso, jamón, aceitunas, orégano",
            "available": true,
            "user": {
                "name": "Test 1",
                "uid": "62def8450c05a19c9b1bd10c"
            },
            "category": {
                "name": "PIZZAS",
                "_id": "62e2e4900933cae7d9a8f839"
            }
        }
    ]
}
~~~

### products by category
- Request:
    - Get
    - /api/search/productsByCategory/pizzas
    - /api/search/productsByCategory/foo-1234567
- Response:
~~~
{
    "total": 4,
    "results": [
        {
            "name": "NAPOLITANA",
            "price": 1100,
            "description": "Tomate, queso, jamón, aceitunas, orégano",
            "available": true,
            "user": {
                "name": "Test 1",
                "uid": "62def8450c05a19c9b1bd10c"
            },
            "category": {
                "name": "PIZZAS",
                "_id": "62e2e4900933cae7d9a8f839"
            }
        },
        ...
    ]
}
~~~

# file-upload(images)
---

## Upload file
- Request:
    - Get
    - /api/uploads
- Request:
    - body - form-data
        - file: .png, .jpg, .jpeg or .gif
- Response:
~~~
"HR5VrV-D6cpnNnuLDKvmm.png"
~~~

## Update users img
- Request:
    - PUT
    - /api/uploads/:collection/:id
    - /api/uploads/users/62def8450c05a19c9b1bd10c
- Request:
    - body - form-data
        - file: .png, .jpg, .jpeg or .gif
- Response:
~~~
{
    "name": "Test 1",
    "email": "test1@email.com",
    "img": "yicjAY2Og7CTGPDbLVhWZ.png",
    "role": "ADMIN_ROLE",
    "status": true,
    "google": false,
    "uid": "62def8450c05a19c9b1bd10c"
}
~~~

## Update products img
- Request:
    - PUT
    - /api/uploads/:collection/:id
    - /api/uploads/products/62e41052b7ce17a6f69e1bd3
- Request:
    - body - form-data
        - file: .png, .jpg, .jpeg or .gif
- Response:
~~~
{
    "name": "PRODUCT 3",
    "price": 0,
    "available": true,
    "user": "62def8450c05a19c9b1bd10c",
    "category": "62e2e4880933cae7d9a8f835",
    "img": "VrKQRJQfSqHFXH8Jt-AbS.jpg"
}
~~~

## Get product image
- Request:
    - GET
    - /api/uploads/products/62e41052b7ce17a6f69e1bd3
- Request:

- Response:
~~~
[image.png]
~~~

## Get user image
- Request:
    - GET
    - /api/uploads/users/62def8450c05a19c9b1bd10c
- Request:

- Response:
~~~
[image.png]
~~~