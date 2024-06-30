"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = require("./api/main");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8888;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// if (process.env.DB_URL) {
//     try {
//         mongoose.connect(process.env.DB_URL);
//         console.log('DB Connected...');
//     } catch (error) {
//         console.log(error);
//     }
// }
const ApiInst = new main_1.Api();
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.post('/api/create/word', ApiInst.createWord);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
