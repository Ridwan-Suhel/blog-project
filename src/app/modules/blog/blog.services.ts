import { IBlog, IUpdateBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";


const createBlogIntoDb = async (payload: IBlog) => {
    const result = await BlogModel.create(payload);
    return result
}

const getAllBlogs = async () => {
    const result = await BlogModel.find().populate('author');
    return result
}

const getSingleBlogFromDb = async (id: string) => {
    const result = await BlogModel.findById(id);
    return result
}

const updateSingleBlogIntoDb = async (id: string, payload: IUpdateBlog) => {
    const result = await BlogModel.findByIdAndUpdate(id, payload, {
        new: true
    });
    return result
}

const deleteSingleBlogFromDb = async (id: string) => {
    const result = await BlogModel.findByIdAndDelete(id);
    return result
}

export const blogServices = {
    createBlogIntoDb,
    getAllBlogs,
    getSingleBlogFromDb,
    updateSingleBlogIntoDb,
    deleteSingleBlogFromDb
}