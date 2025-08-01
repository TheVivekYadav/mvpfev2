import type {RegisterCredentials} from "../types";
import axiosInstance from "./axios.ts";

const registerService = {
    register: async (credentials: RegisterCredentials) => {
        return await axiosInstance.post("/auth/users/register", {user: credentials});
    },
}
export default registerService;