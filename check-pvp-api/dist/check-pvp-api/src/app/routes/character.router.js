"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("controllers");
const router = express_1.Router();
const controller = new controllers_1.CharacterController();
router.get(`/:id`, controller.getCharacterData);
exports.default = router;
//# sourceMappingURL=character.router.js.map