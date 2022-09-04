export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface ICollectionRequest {
  name: string;
  category: string;
  description: string;
  image: string;
  owner: string;
}

export interface ICollectionResponse {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  owner: string;
  ownerInfo: IUser[];
  createdAt: string;
  updatedAt: string;
}

export interface IItemResponse {
  _id: string;
  name: string;
  hashtag: string;
  description: string;
  image: string;
  owner: string;
  likes: ILike[];
  comments: ICommentResponse[];
  itemCollection: string;
  ownerInfo: IUser[];
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentResponse {
  _id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  _id: string;
  user: string;
  item: string;
  createdAt: string;
  updatedAt: string;
}
