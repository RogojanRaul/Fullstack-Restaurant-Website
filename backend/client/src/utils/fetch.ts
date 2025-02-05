import axiosInstance from "@/app/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { store } from "@/store/createStore";
import { logoutUser } from "@/store/user/slice";

export type FetchTypes = {
  url: string;
  customHeaders?: any;
  body?: Record<string, any>;
};

const authToken = Cookies.get("access_token");

export const post = ({ url, body, customHeaders }: FetchTypes) => {
  const authHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, body, { headers })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject(error);
      });
  });
};

export const get = ({ url, customHeaders }: FetchTypes) => {
  const authHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { headers })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteReq = ({ url, body, customHeaders }: FetchTypes) => {
  const authHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, { headers: headers, data: body })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject(error);
      });
  });
};

export const put = ({ url, body, customHeaders }: FetchTypes) => {
  const authHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, body, { headers })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject(error);
      });
  });
};
