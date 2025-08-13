import axiosInstance from "./axios";

type SettlementInput = {
    groupId: string;
    paidBy: string;
    amount: number;
};

export const settlement = {
    create: async ({ groupId, paidBy, amount }: SettlementInput) => {
        return await axiosInstance.post("/settlement/create", {
            groupId,
            paidBy,
            amount
        });
    }
};