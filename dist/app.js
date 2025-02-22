"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
// welcome route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to employee managemenet Server"
    });
});
//Global middleware
app.use(globalErrorHandler_1.default);
//not Found
app.use(notFound_1.default);
exports.default = app;
