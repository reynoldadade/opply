export interface UserLogin {
  username: string;
  token: string;
}

export interface LoginError {
  non_field_error: string[];
}

export interface RegistrationResponse {
  auth_token: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  username: string;
}

export interface LoginResponse {
  token: string;
}
