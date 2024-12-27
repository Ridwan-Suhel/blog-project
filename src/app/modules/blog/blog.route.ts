import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../../middlewears/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// calling controller function here with route
router.post('/blogs', auth(USER_ROLE.user), BlogController.CreateBlog);
router.patch('/blogs/:id', auth(USER_ROLE.user), BlogController.UpdateSingleBlog);
router.delete('/blogs/:id', auth(USER_ROLE.user), BlogController.deleteSingleBlog);
router.delete('/admin/blogs/:id', auth(USER_ROLE.admin), BlogController.deleteSingleBlogByAdmin);
router.get('/blogs', BlogController.getAllBlogsFromDb);

export const BlogRoutes = router;