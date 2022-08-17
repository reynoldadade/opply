import axios, { AxiosError } from "axios";
import { UserLogin } from "../models/login";
import { useAppStore } from "../stores/app";

// interface for user object
interface RegisterUser {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

// interface for login form
interface LoginForm {
  username: string;
  password: string;
}

const instance = axios.create({
  baseURL: "https://february-21.herokuapp.com/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // activate loader
    const appStore = useAppStore();
    appStore.setLoader(true);
    // Do something before request is sent
    return config;
  },
  function (error) {
    const appStore = useAppStore();
    appStore.setLoader(false);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // set loaders to false when results are in
    const appStore = useAppStore();
    appStore.setLoader(false);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // set loaders to false when results are in even on error
    const appStore = useAppStore();
    appStore.setLoader(false);
    return Promise.reject(error);
  }
);

// axios request functions will begin with their http verbs eg POST, GET, PUT, DELETE

// post request to register a new user
export async function POST_users(
  user: RegisterUser
): Promise<UserLogin | void> {
  const appStore = useAppStore();
  try {
    const response = await instance.post("api/v1/users/", user);
    const { username, user_token } = response.data;
    const userObject = { username, token: user_token };
    // set IsError to false
    appStore.setIsError(false);
    return userObject;
  } catch ({ response }) {
    appStore.setIsError(true);
    appStore.setError(response?.data?.username[0]);
  }
}

// post request to login a user
export async function POST_login(user: LoginForm): Promise<UserLogin | void> {
  const appStore = useAppStore();
  try {
    const response = await instance.post("api-token-auth/", user);
    const { username, token } = response.data;
    const userObject = { username, token };
    // set isError to false when login is successful
    appStore.setIsError(true);
    return userObject;
  } catch ({ response }) {
    // set error to true
    appStore.setIsError(true);
    appStore.setError(response?.data?.non_field_errors[0]);
  }
}
