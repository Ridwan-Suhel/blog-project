import { z } from "zod";

const BlogValidationSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}),
    content: z.string().min(1, {message: 'Title is required'}),
    author: z.string(),
    isPublished:  z.boolean().optional(),
})

export default BlogValidationSchema