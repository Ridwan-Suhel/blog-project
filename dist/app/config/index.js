"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process === null || process === void 0 ? void 0 : process.cwd(), '.env') });
exports.default = {
    port: (_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT,
    database_url: (_b = process.env) === null || _b === void 0 ? void 0 : _b.DATABASE_URL,
    bcrypt_salt_round: (_c = process.env) === null || _c === void 0 ? void 0 : _c.BCRYPT_SALT_ROUND,
    jwt_access_secret: (_d = process.env) === null || _d === void 0 ? void 0 : _d.JWT_ACCESS_SECRET
};
