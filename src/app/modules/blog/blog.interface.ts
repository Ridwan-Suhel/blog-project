import { Types } from "mongoose";

export interface IBlog {
    title: string,
    content: string,
    author: Types.ObjectId,
    isPublished?: boolean
}

export interface IUpdateBlog {
    title: string,
    content: string,
}