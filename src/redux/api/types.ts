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
  owner: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IItemResponse {
  _id: string;
  name: string;
  hashtag: string; 
  description: string;
  image: string;
  owner: IUser;
  createdAt: string;
  updatedAt: string;
}
