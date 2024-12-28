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
exports.blogServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const appError_1 = require("../../shared/appError");
const blog_model_1 = require("./blog.model");
const populateAuthor = {
    path: "author",
    select: "-password", // Exclude the password field
};
const createBlogIntoDb = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = Object.assign(Object.assign({}, payload), { author: userId });
    const result = yield blog_model_1.BlogModel.create(blog);
    const populatedBlog = yield result.populate(populateAuthor);
    return populatedBlog;
});
const getAllBlogs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ search, sortBy = "createdAt", sortOrder = "desc", filter }) {
    const query = {};
    // search functionality start
    if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [{ title: regex }, { content: regex }];
    }
    // filtering by author ID
    if (filter) {
        query.author = filter;
    }
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    // Fetching blogs with search, filter, and sort options
    const result = yield blog_model_1.BlogModel.find(query)
        .populate(populateAuthor)
        .sort(sortOptions);
    return result;
});
const getSingleBlogFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findById(id);
    return result;
});
const updateSingleBlogIntoDb = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPaylod = Object.assign(Object.assign({}, payload), { author: userId });
    const blog = yield blog_model_1.BlogModel.findById(id);
    if (!blog) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    if (blog.author.toString() !== userId) {
        throw new appError_1.AppError(403, "You are not authorized to update this blog");
    }
    const result = yield blog_model_1.BlogModel.findByIdAndUpdate(id, updatedPaylod, {
        new: true,
    });
    if (!result) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    // Populating the author field
    const populatedBlog = yield result.populate(populateAuthor);
    return populatedBlog;
});
const deleteSingleBlogFromDb = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findById(id);
    if (!blog) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    if (blog.author.toString() !== userId) {
        throw new appError_1.AppError(403, "You are not authorized to delete this blog");
    }
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    // Populating the author field
    const populatedBlog = yield result.populate(populateAuthor);
    return populatedBlog;
});
const deleteSingleBlogFromDbByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findById(id);
    if (!blog) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.AppError(404, "Blog not found");
    }
    // Populating the author field
    const populatedBlog = yield result.populate(populateAuthor);
    return populatedBlog;
});
exports.blogServices = {
    createBlogIntoDb,
    getAllBlogs,
    getSingleBlogFromDb,
    updateSingleBlogIntoDb,
    deleteSingleBlogFromDb,
    deleteSingleBlogFromDbByAdmin
};
