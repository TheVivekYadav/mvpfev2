import axiosInstance from "./axios.ts";

const groupService = {
    getAllGroups: async () => {
        return await axiosInstance.get("/groups/get-all-groups");
    }
}

export default groupService;