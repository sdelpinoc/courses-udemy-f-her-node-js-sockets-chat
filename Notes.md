# Notes
- To start project
- `npm init -y`

## Installations
- [express](https://www.npmjs.com/package/express) y [dotenv](https://www.npmjs.com/package/dotenv)
- `npm install express dotenv`

- [cors](https://www.npmjs.com/package/cors)
- `npm install cors`

## Heroku

- `heroku git: remote -a sdelpinoc-node-js-restserver`
- `git push heroku main`
- Add npm start in package.json
- Url: https://sdelpinoc-node-js-restserver.herokuapp.com/

# Notes - section 9

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) -> create a account
- Create new proyect(name: cursos-udemy-fernando-herrera-node-js-restserver-cafe)
- Creae new database
- Create new cluster(name: node-js-restserver-cafe)
- Create user(name: user_node_js, password: <password>), add the credencials in .env file
- Connect by Mongo Db Compass
    - connection string: [connection-string-mongodb]

- Start mongodb compass y use the connection string:
    - [connection-string-mongodb]

## Installations

- Aplication: [MongoDB Compass]()

- [mongoose](https://mongoosejs.com/)
- `npm install mongoose`

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- `npm install bcryptjs`

- [mongoose-hidden](https://www.npmjs.com/package/mongoose-hidden)
- `npm install mongoose-hidden`

- [express-validator](https://www.npmjs.com/package/express-validator)
- `npm install express-validator`

## GIT Heroku

- `herou login`
- `heroku git:remote -a node-js-restserver-mongo-db`

- To access to mongodb from Heroku, you need to go to MongoDb Atlas(Web), Security -> Network Access, IP Access List, 
+ADD IP ADDRESS, select ALOW ACCCESS FROM ANYWHERE -> Confirm.

- In Heroku, go to your dashboard, select the App, clic in More, Restart all dynos.

## GIT

- Remove tracing of .env file
- `git rm .env -cached`

- Get back the file
- `git checkout HEAD .env`

## Heroku

- Check environment variables:
- `heroku config`

- Set environment variables:
- `heroku config:set name="Sergio"` -> This is set in process.env.nombre now

- Delete environment variables:
- `heroku config:unset name`

- Set the MONGODB connection string:
- `heroku config:set MONGODB_CNN=""`

# Notes - Section 10

## JWT

- [JWT](https://jwt.io/)

## Installations

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- `npm install jsonwebtoken`

## Heroku

- `herou login`
- `heroku git:remote -a node-js-restserver-mongodb-jwt`

- Set the environment variables:
    - `heroku config:set MONGODB_CNN=""`
    - `heroku config:set SECRETORPRIVATE_KEY=""`

- To check logs:
    - `npm logs -n 100`
    - `npm logs -n 100 --tail` -> Live logs

# Notes - Section 11

## Google Sign-in

- You need a google acount
- [Console Google](https://console.cloud.google.com/)
- Add google button 
    - https://developers.google.com/identity/gsi/web/guides/display-button
    - https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions
- Proyect name:
    - nodejs-rs-google-sign-in

- Settings proyect:
    - API & Services -> OAuth consent screen
    - Select External and click in Create
    - Fill the information of app name, email developer and email support

    - Go to Credentials -> Create crendentials -> Create OAuth client ID
    - Select Type of application and add a name
    - Authorized JavaScript origins:
        - https://localhost
        - https://localhost:8080
        - http://localhost
        - http://localhost:8080
        - Update, also add the heroku url:
            - https://rs-google-sign-in.herokuapp.com

    - Your Client ID: <cliente_id>
    - Your Cliente Secret: <secret_id>

    - Add the cliente id and cliente secret to the environment variables(.env)

    - Go to https://localhost:8080 and sign in

    - To verify the ID token: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
    - Install google-auth-library
    - `npm install google-auth-library`

    - To close google auth use revoke function

## Heroku

- `herou login`
- `heroku git:remote -a rs-google-sign-in`

- Set the environment variables:
    - `heroku config:set MONGODB_CNN=""`
    - `heroku config:set SECRETORPRIVATE_KEY=""`
    - `heroku config:set GOOGLE_CLIENTE_ID=""`

- To check logs:
    - `npm logs -n 100`
    - `npm logs -n 100 --tail` -> Live logs

-  https://rs-google-sign-in.herokuapp.com/

# Notes - Section 12

## Heroku

- `heroku login`
- `heroku git: remote -a rs-crud-category-product`

- Set the environment variables:
    - `heroku config:set MONGODB_CNN=""`
    - `heroku config:set SECRETORPRIVATE_KEY=""`
    - `heroku config:set GOOGLE_CLIENTE_ID=""`

- https://rs-crud-category-product.herokuapp.com/

# Notes - Section 13

## Installations

- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- `npm install express-fileupload`

- [nanoid](https://github.com/ai/nanoid#readme)
- `npm install --save nanoid`

- [cloudinary](https://www.npmjs.com/package/cloudinary)
- `npm install cloudinary`

## Heroku

- `heroku login`
- `heroku git:remote -a rs-file-upload`

- Set the environment variables:
    - `heroku config:set MONGODB_CNN=""`
    - `heroku config:set SECRETORPRIVATE_KEY=""`
    - `heroku config:set GOOGLE_CLIENTE_ID=""`
    - `heroku config:set CLOUDINARY_URL=""`

- https://rs-crud-category-product.herokuapp.com/

# Notes - Section 16

## Installations

- [socket.io](https://www.npmjs.com/package/socket.io)
- `npm install socket.io`

## CSS

- [bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css