"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blog_route_1 = require("./app/modules/blog/blog.route");
const auth_routes_1 = require("./app/modules/Auth/auth.routes");
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes related to auths
app.use('/api', user_route_1.UserRoutes);
app.use('/api', blog_route_1.BlogRoutes);
app.use('/api', auth_routes_1.AuthRoutes);
// root routes for for app api
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: "Welcome to blog app. API V.0.1 🔥",
    });
});
// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
