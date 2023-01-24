import { Rang } from "src/constans";
import { Comment } from "./comment.interface";
import { Date } from "./date.interface";

export class AnnouncmentInterface {
    _id?: string
    author: string
    content: string
    likes: string[]
    comments: Comment[]
    rang: Rang
    date: Date
}

export interface CreateAnnouncmentDto {
    author: string
    content: string
    rang: Rang
    date: Date
}