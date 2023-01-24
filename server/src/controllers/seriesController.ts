import {Request, Response} from "express";
import pool from "../database";


class SeriesController {
    public async list(req: Request, res: Response) {
        try{
            const series = await pool
                .then((r: any) => r.query('SELECT * FROM games'));
            res.json(series);
        } catch (e: any){
            console.log(e);
        }
    }

    public async create(req: Request, res: Response) {
        try{
            await pool.then((r:any) => r.query(
                'INSERT INTO series set ?', [req.body]));
            res.json({message: 'Serie guardada'});
        } catch (e: any) {
            console.log(e.sqlMessage);
            res.send(e.sqlMessage);
        }
    }

    public async getOne(req: Request, res: Response) {
        try{
            const {id} = req.params;
            const serie = await pool.then((r: any) => r.query(
                'SELECT * FROM series WHERE id = ?', [id]));
            if(serie.length > 0) {
                return res.json(serie[0]);
            }
            res.status(404).json({message: 'La serie no existe'});
        } catch (e: any) {
            console.log(e.sqlMessage);
        }
    }

    public async update(req: Request, res: Response) {
        try{
            const {id} = req.params;
            await pool.then((r: any) => r.query(
                    'UPDATE series SET ? WHERE id = ?', [req.body, id]
                )
                    .then((data: any) => {
                        if (data.affectedRows > 0) {
                            res.json({message: 'La serie se ha actualizado'});
                        } else res.status(404).json(
                            {message: 'La serie no existe'});
                    })
            )
        } catch (e: any) {
            console.log(e.sqlMessage);
            res.send(e.sqlMessage);
        }
    }

    public async delete(req: Request, res: Response) {
        try{
            const {id} = req.params;
            await pool.then((r: any) => r.query(
                'DELETE FROM series WHERE id = ?', [id])
                .then((data: any) => {
                        if(data.affectedRows > 0) {
                            res.json({message: 'La serie ha sido eliminada'});
                        } else res.status(404).json({message: 'La serie no existe'});
                    }
                ));
        } catch (e: any) {
            res.send(e.sqlMessage);
            console.log(e.sqlMessage);
        }
    }
}

const seriesController = new SeriesController();
export default seriesController;
