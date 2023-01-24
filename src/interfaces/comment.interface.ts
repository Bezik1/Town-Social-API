export class Comment {
    author: string
    content: string
    likes: string[]
}

export interface CreateCommentDto {
    author: string
    content: string
}