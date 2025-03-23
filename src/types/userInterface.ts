
export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role:string;
}

export interface  Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  username: string;
  email: string;
  role: string;
}
