/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "../../shared/appError";
import { IBlog, IUpdateBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const populateAuthor = {
    path: "author",
    select: "-password", // Exclude the password field
}

interface TBlogQueryParams {
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filter?: string;
  }

const createBlogIntoDb = async (payload: IBlog, userId: string) => {
    const blog = {
        ...payload,
        author: userId
    }
    const result = await BlogModel.create(blog);
    const populatedBlog = await result.populate(populateAuthor);
    return populatedBlog
}

const getAllBlogs = async ({ search, sortBy = "createdAt", sortOrder = "desc", filter } : TBlogQueryParams) => {
    const query: any = {};
  
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
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
  
    // Fetching blogs with search, filter, and sort options
    const result = await BlogModel.find(query)
      .populate(populateAuthor)
      .sort(sortOptions);
  
    return result;
  };

const getSingleBlogFromDb = async (id: string) => {
    const result = await BlogModel.findById(id);
    return result
}

const updateSingleBlogIntoDb = async (id: string, payload: IUpdateBlog, userId: string) => {
    const updatedPaylod = {
        ...payload,
        author: userId
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    if (blog.author.toString() !== userId){
      throw new AppError(403, "You are not authorized to update this blog")
    }

    const result = await BlogModel.findByIdAndUpdate(id, updatedPaylod, {
        new: true,
    });

    if (!result) {
        throw new AppError(404, "Blog not found");
    }

    // Populating the author field
    const populatedBlog = await result.populate(populateAuthor);
    return populatedBlog;
}

const deleteSingleBlogFromDb = async (id: string, userId: string) => {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    if (blog.author.toString() !== userId){
      throw new AppError(403, "You are not authorized to delete this blog")
    }

    const result = await BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(404, "Blog not found");
    }
    // Populating the author field
    const populatedBlog = await result.populate(populateAuthor);
    return populatedBlog;
}

const deleteSingleBlogFromDbByAdmin = async (id: string) => {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      throw new AppError(404, "Blog not found");
    }

    const result = await BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError(404, "Blog not found");
    }
    // Populating the author field
    const populatedBlog = await result.populate(populateAuthor);
    return populatedBlog;
}
export const blogServices = {
    createBlogIntoDb,
    getAllBlogs,
    getSingleBlogFromDb,
    updateSingleBlogIntoDb,
    deleteSingleBlogFromDb,
    deleteSingleBlogFromDbByAdmin
}