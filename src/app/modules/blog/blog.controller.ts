/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
// import BlogValidationSchema from "./blog.validation";
import { blogServices } from "./blog.services";


const CreateBlog = async (req: Request, res: Response) => {
    try{
        const payload = req.body;
        // const parseValidateData = BlogValidationSchema.parse(payload);
    
        const result = await blogServices.createBlogIntoDb(payload);
        res.status(200).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: result,
          });
    }
      catch(error: unknown | any){
        console.log(error)
        if(error.issues){
            const { message } = error.issues[0];
            const errorFormat = {
                success: false,
                message: message ? message : "Validation error",
                statusCode: 400,
                error: { 
                    details: error.issues[0]
                 },
                stack: `Error: Something went wrong \n ${(error as Error).stack}`,
              };
            res.status(400).json(errorFormat);
        }
        else{
            res.status(400).json(error);
        }
    }
}

const getAllBlogsFromDb = async (req: Request, res: Response) => {
    try {
        const result = await blogServices.getAllBlogs();
        res.status(200).json({
            status: true,
            message: 'Blogs retrieved successfully',
            data: result,
          });

    }
   
    catch(error: unknown | any){
        res.status(200).json({
            status: false,
            message: 'Something went wrong',
            error: error,
          });
    }

}

export const BlogController = {
    CreateBlog,
    getAllBlogsFromDb
}