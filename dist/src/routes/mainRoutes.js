"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var router = express_1.default.Router();
router.get('/user', userController_1.default.getUser);
router.get('/user/:id', userController_1.default.getUserId);
router.post('/register', userController_1.default.createUser);
router.patch('/user/:id', userController_1.default.updateUser);
router.delete('/user/:id', userController_1.default.deleteUser);
exports.default = router;
