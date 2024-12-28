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
exports.BlogController = void 0;
const blog_validation_1 = __importDefault(require("./blog.validation"));
const blog_services_1 = require("./blog.services");
const appError_1 = require("../../shared/appError");
const CreateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const parseValidateData = blog_validation_1.default.parse(payload);
        const result = yield blog_services_1.blogServices.createBlogIntoDb(parseValidateData, userId);
        res.status(200).json({
            success: true,
            message: 'Blog created successfully',
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : 'Validation error',
                statusCode: 400,
                error: {
                    details: error.issues[0],
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        else {
            res.status(400).json(error);
        }
    }
});
const getAllBlogsFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, sortBy = "createdAt", sortOrder = "desc", filter } = req.query;
        // const result = await blogServices.getAllBlogs(searchTerm as string);
        const result = yield blog_services_1.blogServices.getAllBlogs({
            search: search,
            sortBy: sortBy,
            sortOrder: sortOrder,
            filter: filter,
        });
        res.status(200).json({
            status: true,
            message: 'Blogs retrieved successfully',
            data: result,
        });
    }
    catch (error) {
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
                message: 'An unexpected error occurred',
                error: {
                    details: error,
                },
            });
        }
    }
});
const UpdateSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const payload = req.body;
        const blogId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        // const parseValidateData = BlogValidationSchema.parse(payload);
        const result = yield blog_services_1.blogServices.updateSingleBlogIntoDb(blogId, payload, userId);
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : 'Validation error',
                statusCode: 400,
                error: {
                    details: error.issues[0],
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        if (error instanceof appError_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: {
                    statusCode: error.statusCode,
                },
            });
        }
        else {
            res.status(400).json(error);
        }
    }
});
const deleteSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const blogId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
        yield blog_services_1.blogServices.deleteSingleBlogFromDb(blogId, userId);
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: 201,
            // data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : 'Validation error',
                statusCode: 400,
                error: {
                    details: error.issues[0],
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        if (error instanceof appError_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: {
                    statusCode: error.statusCode,
                },
            });
        }
        else {
            res.status(400).json(error);
        }
    }
});
const deleteSingleBlogByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blogId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        yield blog_services_1.blogServices.deleteSingleBlogFromDbByAdmin(blogId);
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: 200,
            // data: result,
        });
    }
    catch (error) {
        if (error.issues) {
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : 'Validation error',
                statusCode: 400,
                error: {
                    details: error.issues[0],
                },
                stack: `Error: Something went wrong \n ${error.stack}`,
            };
            res.status(400).json(errorFormat);
        }
        if (error instanceof appError_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: {
                    statusCode: error.statusCode,
                },
            });
        }
        else {
            res.status(400).json(error);
        }
    }
});
exports.BlogController = {
    CreateBlog,
    getAllBlogsFromDb,
    UpdateSingleBlog,
    deleteSingleBlog,
    deleteSingleBlogByAdmin
};
