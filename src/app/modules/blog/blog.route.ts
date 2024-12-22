import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

// calling controller function here with route
router.post('/blogs', BlogController.CreateBlog);
router.get('/blogs', BlogController.getAllBlogsFromDb);

export const BlogRoutes = router;