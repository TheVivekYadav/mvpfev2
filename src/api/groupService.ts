import axiosInstance from "./axios.ts";

export const groupService = {
    getAllGroups: async () => {
        return await axiosInstance.get("/groups/");
    }
}

