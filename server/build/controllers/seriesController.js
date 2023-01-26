"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class SeriesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const series = yield database_1.default
                    .then((r) => r.query('SELECT * FROM games'));
                res.json(series);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO series set ?', [req.body]));
                res.json({ message: 'Serie guardada' });
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const serie = yield database_1.default.then((r) => r.query('SELECT * FROM series WHERE id = ?', [id]));
                if (serie.length > 0) {
                    return res.json(serie[0]);
                }
                res.status(404).json({ message: 'La serie no existe' });
            }
            catch (e) {
                console.log(e.sqlMessage);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('UPDATE series SET ? WHERE id = ?', [req.body, id])
                    .then((data) => {
                    if (data.affectedRows > 0) {
                        res.json({ message: 'La serie se ha actualizado' });
                    }
                    else
                        res.status(404).json({ message: 'La serie no existe' });
                }));
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('DELETE FROM series WHERE id = ?', [id])
                    .then((data) => {
                    if (data.affectedRows > 0) {
                        res.json({ message: 'La serie ha sido eliminada' });
                    }
                    else
                        res.status(404).json({ message: 'La serie no existe' });
                }));
            }
            catch (e) {
                res.send(e.sqlMessage);
                console.log(e.sqlMessage);
            }
        });
    }
}
const seriesController = new SeriesController();
exports.default = seriesController;
