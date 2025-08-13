import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { groupService } from "../../api/groupService";

export function AddMemberModal({ show, onClose }: any) {
    const router = useRouter();
    const [addMemberGroupId, setAddMemberGroupId] = useState<string | null>(null);
    const [addMemberUserIds, setAddMemberUserIds] = useState<string>("");

    

    const handleSubmitAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!addMemberGroupId) return;
        const userIds = addMemberUserIds.split(",").map((id: string) => id.trim()).filter(Boolean);
        if (userIds.length === 0) return;
        try {
            await groupService.addMember(addMemberGroupId, userIds);
            // setShowAddMemberModal(false);
            setAddMemberGroupId(null);
            setAddMemberUserIds("");
            await router.invalidate();
        } catch (error) {
            console.error("Failed to add members:", error);
        }
    };
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-lg font-bold mb-4 text-blue-700">Add Members</h3>
                <form onSubmit={handleSubmitAddMember} className="space-y-4">
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        placeholder="Enter user IDs (comma separated)"
                        value={addMemberUserIds}
                        onChange={(e) => setAddMemberUserIds(e.target.value)}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}