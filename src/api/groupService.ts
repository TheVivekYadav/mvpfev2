import axiosInstance from "./axios.ts";

export const groupService = {
  getAllGroups: async () => {
    return await axiosInstance.get("/groups/");
  },
  createGroup: async (name: string) => {
    return await axiosInstance.post("groups/create", { name });
  },
  addMember: async (groupId: string, userIds: string[]) => {
    return await axiosInstance.post(`groups/${groupId}/add-member`, {
      userIds: userIds,
    });
  },
  listGroupMembers: async (groupId: string) => {
    return await axiosInstance.get(`groups/${groupId}/members`);
  },
  getGroupExpenses: async (groupId: string) => {
    return await axiosInstance.get(`expense/${groupId}`);
  },
  getGroupById: async (groupId: string) => {
    return await axiosInstance.get(`groups/${groupId}`);
  },
};
