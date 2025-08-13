import { useRouter } from "@tanstack/react-router";
import { groupService } from "../../api/groupService.ts";
import { AddExpense } from "../AddExpense.tsx";

export function AddExpenseModal({ show, onClose }: any) {
    const router = useRouter();
    const groupOptions = groups ?? []; // i have to make it default selected
    const userOptions = allGroupMembers.length > 0 ? allGroupMembers : friends ?? [];

    const handleAddExpense = async (expense: any) => {
        try {
            await groupService.createExpense(expense);
            // setShowAddExpenseModal(false);
            // setSelectedExpenseGroupId(null);
            await router.invalidate();
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <AddExpense
                    groups={groupOptions}
                    users={userOptions}
                    onSubmit={handleAddExpense}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
}