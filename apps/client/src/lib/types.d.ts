export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified : string;
    username : string;
    phone : string;
    image : string;
    about    : string;     
    facebook : string;
    instagram: string;
    twitter  : string;
    linkedIn : string
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

export type State = {
  userId: string;
  totalHours: number;
  name: string;
}

export type ConnectedUser = {
  username : string;
}