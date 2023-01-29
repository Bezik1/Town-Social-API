export class Comment {
    author: string
    content: string
    responses?: Comment[]
    likes: string[]
}

export interface CreateCommentDto {
    author: string
    content: string
}