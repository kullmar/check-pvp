"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const character_router_1 = __importDefault(require("./character.router"));
const recent_check_router_1 = __importDefault(require("./recent-check.router"));
const express_1 = require("express");
const router = express_1.Router();
router.use('/character', character_router_1.default);
router.use('/recent-check-stream', recent_check_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map