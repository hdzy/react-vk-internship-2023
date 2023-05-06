export interface IStateType {
    posts: postType,
    tags: Array<string>,
}

export type userType = {
    _id: number,
    fullName: string,
    email: string,
    passwordHash: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export type postType = {
    _id: number,
    title: string,
    content: string,
    tags: Array<string>,
    user: userType,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    viewsCount: number,
    __v: number,
}