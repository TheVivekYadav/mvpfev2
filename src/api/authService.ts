import type {LoginCredentials, RegisterCredentials, ResetPasswordPayload} from "../types";
import axiosInstance from "./axios.ts";

const authService = {
    login: async (credentials: LoginCredentials) => {
        return await axiosInstance.post("/auth/users/login", {user: credentials});
    },
    register: async (credentials: RegisterCredentials) => {
        return await axiosInstance.post("/auth/users/register", credentials);
    },
    verifyToken: async () => {
        return await axiosInstance.get("/auth/users/verify");
    },
    resetPassword: async (payload: ResetPasswordPayload) => {
        return await axiosInstance.post("/auth/users/reset-password", payload);
    },
    getAllUser: async () => {
        return await axiosInstance.get("/auth/users/get-all-users");
    },
    logout: async () => {
        return await axiosInstance.get("/auth/users/logout");
    }
}


export default authService;