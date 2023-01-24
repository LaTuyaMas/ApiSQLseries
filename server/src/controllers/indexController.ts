import {Request, Response} from "express";


class IndexController {
    public async index (req: Request, res: Response) {
        res.send('API is on /api/series');
    }
}

export const indexController = new IndexController();
