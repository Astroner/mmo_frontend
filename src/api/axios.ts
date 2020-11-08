import { env } from "@/env";
import Axios from "axios";

export const axios = Axios.create({
    baseURL: env.API,
});
