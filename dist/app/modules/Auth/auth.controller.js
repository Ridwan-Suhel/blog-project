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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const appError_1 = require("../../shared/appError");
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthService.LoginUser(req.body);
        res.status(200).json({
            success: true,
            message: "User is logged in successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : "Validation error",
                statusCode: 400,
                error: {
                    details: error.issues[0]
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        if (error instanceof appError_1.AppError) {
            // Format the response for AppError
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: {
                    statusCode: error.statusCode,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unexpected error occurred",
                error: {
                    details: error,
                },
            });
        }
    }
    // else{
    //     console.log(error.message)
    //     res.status(400).json(
    //         error
    //     );
    // }
});
exports.AuthController = {
    LoginUser
};