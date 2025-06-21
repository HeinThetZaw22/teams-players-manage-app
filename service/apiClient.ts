import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.balldontlie.io/epl/v1",
  headers: {
    Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});
