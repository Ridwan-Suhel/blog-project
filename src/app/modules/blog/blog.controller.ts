/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import BlogValidationSchema from "./blog.validation";
import { blogServices } from './blog.services';
import { AppError } from '../../shared/appError';

const CreateBlog = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userId = req.user?.id;
    const parseValidateData = BlogValidationSchema.parse(payload);

    const result = await blogServices.createBlogIntoDb(parseValidateData, userId);
    res.status(200).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error: unknown | any) {
    console.log(error);
    if (error.issues) {
      const { message } = error.issues[0];
      const errorFormat = {
        success: false,
        message: message ? message : 'Validation error',
        statusCode: 400,
        error: {
          details: error.issues[0],
        },
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };
      res.status(400).json(errorFormat);
    } else {
      res.status(400).json(error);
    }
  }
};

const getAllBlogsFromDb = async (req: Request, res: Response) => {
  try {
    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = req.query;
    // const result = await blogServices.getAllBlogs(searchTerm as string);

    const result = await blogServices.getAllBlogs({
      search: search as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
      filter: filter as string,
    });

    res.status(200).json({
      status: true,
      message: 'Blogs retrieved successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      // Format the response for AppError
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        error: {
          statusCode: error.statusCode,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unexpected error occurred',
        error: {
          details: error,
        },
      });
    }
  }
};

const UpdateSingleBlog = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const blogId = req.params?.id;
    const userId = req.user?.id;
    // const parseValidateData = BlogValidationSchema.parse(payload);

    const result = await blogServices.updateSingleBlogIntoDb(blogId, payload, userId);
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error: unknown | any) {
    if (error.issues) {
      const { message } = error.issues[0];
      const errorFormat = {
        success: false,
        message: message ? message : 'Validation error',
        statusCode: 400,
        error: {
          details: error.issues[0],
        },
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };
      res.status(400).json(errorFormat);
    }
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
          success: false,
          message: error.message,
          error: {
              statusCode: error.statusCode,
          },
      });
  } else {
      res.status(400).json(error);
    }
  }
};

const deleteSingleBlog = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const blogId = req.params?.id;

    await blogServices.deleteSingleBlogFromDb(blogId, userId);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 201,
      // data: result,
    });
  } catch (error: unknown | any) {
    if (error.issues) {
      const { message } = error.issues[0];
      const errorFormat = {
        success: false,
        message: message ? message : 'Validation error',
        statusCode: 400,
        error: {
          details: error.issues[0],
        },
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };
      res.status(400).json(errorFormat);
    }
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
          success: false,
          message: error.message,
          error: {
              statusCode: error.statusCode,
          },
      });
  } else {
      res.status(400).json(error);
    }
  }
}; 

const deleteSingleBlogByAdmin = async (req: Request, res: Response) => {
  try {
    const blogId = req.params?.id;

    await blogServices.deleteSingleBlogFromDbByAdmin(blogId);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
      // data: result,
    });
  } catch (error: unknown | any) {
    if (error.issues) {
      const { message } = error.issues[0];
      const errorFormat = {
        success: false,
        message: message ? message : 'Validation error',
        statusCode: 400,
        error: {
          details: error.issues[0],
        },
        stack: `Error: Something went wrong \n ${(error as Error).stack}`,
      };
      res.status(400).json(errorFormat);
    }
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
          success: false,
          message: error.message,
          error: {
              statusCode: error.statusCode,
          },
      });
  } else {
      res.status(400).json(error);
    }
  }
}; 

export const BlogController = {
  CreateBlog,
  getAllBlogsFromDb,
  UpdateSingleBlog,
  deleteSingleBlog,
  deleteSingleBlogByAdmin
};
