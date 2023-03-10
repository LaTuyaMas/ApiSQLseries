"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seriesController_1 = __importDefault(require("../controllers/seriesController"));
class SeriesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', seriesController_1.default.list);
        this.router.get('/serie/:id', seriesController_1.default.getOne);
        this.router.post('/', seriesController_1.default.create);
        this.router.put('/:id', seriesController_1.default.update);
        this.router.delete('/:id', seriesController_1.default.delete);
    }
}
const seriesRoutes = new SeriesRoutes();
exports.default = seriesRoutes.router;
