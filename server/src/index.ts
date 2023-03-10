import express, { Application} from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import seriesRoutes from "./routes/seriesRoutes";

class Server {

    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.set('port', process.env.PORT || 3306);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes() {
        this.app.use('/', indexRoutes);
        this.app.use('/api/series', seriesRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
