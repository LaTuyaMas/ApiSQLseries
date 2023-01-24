import {Router} from "express";
import seriesController from "../controllers/seriesController";


class SeriesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', seriesController.list);
        this.router.get('/serie/:id', seriesController.getOne);
        this.router.post('/', seriesController.create);
        this.router.put('/:id', seriesController.update);
        this.router.delete('/:id', seriesController.delete);
    }
}

const seriesRoutes = new SeriesRoutes();
export default seriesRoutes.router;
