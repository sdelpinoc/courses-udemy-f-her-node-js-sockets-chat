import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import http from 'http';

import { Server as ServerIo } from 'socket.io';

import { path, __dirname } from '../helpers/index.js';

import {
    routerAuth,
    routerCategories,
    routerProducts,
    routerSearch,
    routerUploads,
    routerUsers
} from '../routes/index.js';

import { dbConnection } from '../database/config.js';
import { validateJSON } from '../middlewares/validate-fields.js';

import { socketController } from '../sockets/controller.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // socket.io
        this.server = http.createServer(this.app);
        this.io = new ServerIo(this.server);

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
            users: '/api/users'
        };

        // this.corsOptions = {
        //     origin: 'http://example.com',
        //     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        // };

        // Connect DB
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and parse of the body(The Content-Type of the request must be json)
        this.app.use(express.json());

        // Public directory, we set "the root" directory for our application
        this.app.use(express.static('public'));

        // Check format JSON body
        this.app.use(validateJSON);

        // express-fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // Caution!, allow to create a directory if not exists
        }));
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.categories, routerCategories);
        this.app.use(this.paths.products, routerProducts);
        this.app.use(this.paths.search, routerSearch);
        this.app.use(this.paths.uploads, routerUploads);
        this.app.use(this.paths.users, routerUsers);
    }

    sockets() {
        this.io.on('connection', socket => socketController(socket, this.io));
    }

    listen() {
        // this.app.listen(this.port, () => {
        //     console.log('Server running in PORT: ', this.port);
        // });

        // socket.io
        this.server.listen(this.port, () => {
            console.log('Server running in PORT: ', this.port);
        });
    }
}