"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes related to 
// root routes for for app api
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: "Welcome to [] app. API V.0.1 🔥",
    });
});
exports.default = app;
