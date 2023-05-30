export type Events = EventType[]

export type EventType = 
{
    id:number;
    title: string;
    description: string;
    eventDate: string;
    location: string;
    comments?: CommentType[];
    isPublished?: boolean;
    createdAt?: string
}

export type CommentType = {
    author: AuthorType;
    text: string;
    publishDate: string;
    isPublished: boolean;

}

export type AuthorType = {
    firstname: string;
    lastname: string
}