import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema <IBlog>({
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    author: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    isPublished: {type: Boolean, default: true},
},
{
    timestamps: true
}
)

export const BlogModel = model<IBlog>('Blog', blogSchema);
 