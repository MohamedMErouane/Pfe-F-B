export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified : string;
    phone : string;
    image : string;
  };

export type Tokens = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export type Todo = {
  id : string
  description : string
  completed : boolean
  createdAt : Date
  user : User
  userId : String
}