import axiosInstance from "./axios";

type SettlementInput = {
    groupId: string;
    paidTo: string;
    amount: number;
};

export const settlement = {
    create: async ({ groupId, paidTo, amount }: SettlementInput) => {
        return await axiosInstance.post("/settlement/create", {
            groupId,
            paidTo,
            amount
        });
    }
};