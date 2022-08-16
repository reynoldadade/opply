export interface UserLogin {
  username: string;
  token: string;
}

export interface LoginError {
  non_field_error: string[];
}
