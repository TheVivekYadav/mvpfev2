import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { groupService } from "../../api/groupService";

export function CreateGroupModal({ show, onClose }: any) {

    const router = useRouter();

    const [newGroupName, setNewGroupName] = useState("");

    const handleSubmitCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        try {
            await groupService.createGroup(newGroupName.trim());
            // setShowCreateGroupModal(false);
            setNewGroupName("");
            await router.invalidate();
        } catch (error) {
            console.error("Failed to create group:", error);
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
                <h3 className="text-lg font-bold mb-4 text-green-700">Create New Group</h3>
                <form onSubmit={handleSubmitCreateGroup} className="space-y-4">
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 transition"
                        placeholder="Group Name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
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
                            className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}