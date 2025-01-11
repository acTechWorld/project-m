"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const repositoryRoutes_1 = __importDefault(require("@/routes/repositoryRoutes"));
const languageRoutes_1 = __importDefault(require("@/routes/languageRoutes"));
const githubRoutes_1 = __importDefault(require("@/routes/githubRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Initialize TypeORM DataSource
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected successfully.');
})
    .catch((error) => {
    console.error('Error connecting to the database:', error);
});
// Add routes
app.use('/api/repositories', repositoryRoutes_1.default);
app.use('/api/languages', languageRoutes_1.default);
app.use('/api/github', githubRoutes_1.default);
exports.default = app;
