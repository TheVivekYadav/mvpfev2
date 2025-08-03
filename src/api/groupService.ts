import axiosInstance from "./axios.ts";

export const groupService = {
    getAllGroups: async () => {
        return await axiosInstance.get("/groups/");
    },
    createGroup: async (name: string) => {
        return await axiosInstance.post("groups/create", {name})
    },
    addMember: async (groupId: string, userIds: string[]) => {
        return await axiosInstance.post(`groups/${groupId}/add-member`, {userIds: userIds})
    },
    listGroupMembers: async (groupId: string) => {
        return await axiosInstance.get(`groups/${groupId}/members`)
    },
    getGroupExpenses: async (groupId: string) => {
        return await axiosInstance.get(`expense/${groupId}`)
    },
    createExpense: async (expense: {
        groupId: string;
        paidBy: string;
        amount: number;
        description: string;
        date: string;
        splitAmong: { userId: string; percentage: number }[];
    }) => {
        return await axiosInstance.post("expense/create", expense);
    },
}
