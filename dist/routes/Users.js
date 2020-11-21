"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_mock_1 = __importDefault(require("@daos/User/UserDao.mock"));
const constants_1 = require("@shared/constants");
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router = express_1.Router();
const userDao = new UserDao_mock_1.default();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userDao.getAll();
    return res.status(OK).json({ users });
}));
/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    console.log(user);
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    yield userDao.add(user);
    return res.status(CREATED).end();
}));
router.post('/addddd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { user } = req.body;
    console.log(user);
    return res.status(CREATED).end();
}));
/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    console.log(user);
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
    user.id = Number(user.id);
    yield userDao.update(user);
    return res.status(OK).end();
}));
/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userDao.delete(Number(id));
    return res.status(OK).end();
}));
/******************************************************************************
 *                                     Export
 ******************************************************************************/
exports.default = router;
