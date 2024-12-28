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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const appError_1 = require("../../shared/appError");
const user_model_1 = require("./user.model");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.create(user);
    return result;
});
const getUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.find();
});
const getSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findById(id);
    return result;
});
const updateSingleUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result;
});
const blockSingleUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPaylod = Object.assign(Object.assign({}, payload), { isBlocked: true });
    const user = yield user_model_1.UserModel.findById(id);
    if (!user) {
        throw new appError_1.AppError(404, "User not found");
    }
    const result = yield user_model_1.UserModel.findByIdAndUpdate(id, updatedPaylod, {
        new: true,
    });
    if (!result) {
        throw new appError_1.AppError(404, "User not found");
    }
    return result;
});
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.UserModel.findByIdAndDelete(id);
    return result;
});
exports.UserServices = {
    createUserIntoDb,
    getUserFromDb,
    getSingleUserFromDb,
    updateSingleUserIntoDb,
    deleteUserFromDb,
    blockSingleUserIntoDb
};
