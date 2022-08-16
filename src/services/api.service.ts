import axios, { AxiosInstance } from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";
import { Supplier, SuppliersResponse } from "../models/suppliers.model";
import { QuotesResponse } from "../models/quotes.model";
import { useAppStore } from "../stores/app";
import { useToast } from "vue-toastification";

// get cookie instance
const cookies = useCookies();

// get toast instance
const toast = useToast();

const instance: AxiosInstance = axios.create({
  baseURL: "https://february-21.herokuapp.com/api/v1",
  // attach the token to the header of every request
  headers: {
    Authorization: "Token " + cookies.get("token"),
  },
});
// create store instance

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
    const appStore = useAppStore();
    appStore.setLoader(false);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // set loaders to false when results are in even on error

    // if the error is a 401 then remove the token from the cookies and redirect to login page
    if (error.response.status === "401") {
      cookies.remove("token");
      appStore.$reset();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// axios request functions will begin with their http verbs eg POST, GET, PUT, DELETE

// both quotes and suppliers have a pagination property, we should set a default url for when you make the initial call and then pass url from the pagination component evry other time
export async function GET_suppliers(
  url: string = "/suppliers/"
): Promise<SuppliersResponse | void> {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch ({ response }) {
    // show with toast if there is an error
    toast.error(response.data.detail);
  }
}

export async function GET_supplier(id: number): Promise<Supplier | void> {
  try {
    const response = await instance.get(`/suppliers/${id}/`);
    return response.data;
  } catch ({ response }) {
    toast.error(response.data.detail);
  }
}

export async function GET_quotes(
  url: string = "/quotes/"
): Promise<QuotesResponse | void> {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch ({ response }) {
    toast.error(response.data.detail);
  }
}
