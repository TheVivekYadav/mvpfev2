import axiosInstance from "./axios";

export const expenseService = {
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
};
