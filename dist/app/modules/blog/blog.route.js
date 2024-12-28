"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
// calling controller function here with route
router.post('/blogs', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogController.CreateBlog);
router.patch('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogController.UpdateSingleBlog);
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogController.deleteSingleBlog);
router.delete('/admin/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), blog_controller_1.BlogController.deleteSingleBlogByAdmin);
router.get('/blogs', blog_controller_1.BlogController.getAllBlogsFromDb);
exports.BlogRoutes = router;
