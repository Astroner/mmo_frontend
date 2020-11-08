import { PublicProfile } from "@/Responses";
import { axios } from "./axios";

export const login = (username: string, password: string) =>
    axios
        .post<{ token: string }>("/user/login/", { username, password })
        .then((res) => res.data);

export const register = (username: string, password: string) =>
    axios
        .post<PublicProfile>("/user/register/", { username, password })
        .then((r) => r.data);

export const getProfile = (token: string) =>
    axios
        .get<PublicProfile>("/user/info/", {
            headers: {
                Authorization: token,
            },
        })
        .then((r) => r.data);

export const getAllUsers = () =>
    axios.get<PublicProfile[]>("/").then((r) => r.data);
