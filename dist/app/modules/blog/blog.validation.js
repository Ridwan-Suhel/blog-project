"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BlogValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'Title is required' }),
    content: zod_1.z.string().min(1, { message: 'Title is required' }),
    author: zod_1.z.string(),
    isPublished: zod_1.z.boolean().optional(),
});
exports.default = BlogValidationSchema;
