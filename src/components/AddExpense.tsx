import React, {useState} from "react";

type UserOption = { _id: string; name: string };
type GroupOption = { _id: string; name: string };

interface SplitUser {
    userId: string;
    percentage: number;
}

interface AddExpenseProps {
    groups: GroupOption[];
    users: UserOption[];
    onSubmit: (expense: {
        groupId: string;
        paidBy: string;
        amount: number;
        description: string;
        date: string;
        splitAmong: SplitUser[];
    }) => void;
    onCancel?: () => void;
}

export const AddExpense: React.FC<AddExpenseProps> = ({
                                                          groups,
                                                          users,
                                                          onSubmit,
                                                          onCancel,
                                                      }) => {
    const [groupId, setGroupId] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [splitAmong, setSplitAmong] = useState<SplitUser[]>([]);

    // Add a user to splitAmong
    const handleAddSplitUser = () => {
        setSplitAmong([...splitAmong, {userId: "", percentage: 0}]);
    };

    // Update splitAmong entry
    const handleSplitChange = (idx: number, field: keyof SplitUser, value: string | number) => {
        setSplitAmong(splitAmong.map((s, i) =>
            i === idx ? {...s, [field]: value} : s
        ));
    };

    // Remove a split user
    const handleRemoveSplitUser = (idx: number) => {
        setSplitAmong(splitAmong.filter((_, i) => i !== idx));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!groupId || !paidBy || !amount || !date || splitAmong.length === 0) return;
        // Ensure backend receives correct types/formats
        onSubmit({
            groupId,
            paidBy,
            amount: Number(amount),
            description,
            date,
            splitAmong: splitAmong.map(s => ({
                userId: s.userId,
                percentage: Number(s.percentage)
            })),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4"
        >
            <h2 className="text-xl font-bold text-blue-700 mb-2">Add Expense</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={groupId}
                    onChange={e => setGroupId(e.target.value)}
                    required
                >
                    <option value="">Select group</option>
                    {groups.map(g => (
                        <option key={g._id} value={g._id}>{g.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid By</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={paidBy}
                    onChange={e => setPaidBy(e.target.value)}
                    required
                >
                    <option value="">Select user</option>
                    {users.map(u => (
                        <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    min={1}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Lunch at ChaiCode"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Split Among</label>
                <div className="space-y-2">
                    {splitAmong.map((split, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <select
                                className="border border-gray-300 rounded-md px-2 py-1"
                                value={split.userId}
                                onChange={e => handleSplitChange(idx, "userId", e.target.value)}
                                required
                            >
                                <option value="">User</option>
                                {users.map(u => (
                                    <option key={u._id} value={u._id}>{u.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="w-20 border border-gray-300 rounded-md px-2 py-1"
                                value={split.percentage}
                                onChange={e => handleSplitChange(idx, "percentage", Number(e.target.value))}
                                min={0}
                                max={100}
                                required
                                placeholder="%"
                            />
                            <span className="text-gray-500 text-xs">%</span>
                            <button
                                type="button"
                                className="ml-2 px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-600"
                                onClick={() => handleRemoveSplitUser(idx)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 px-3 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"
                        onClick={handleAddSplitUser}
                    >
                        Add User
                    </button>
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
                {onCancel && (
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
                >
                    Add Expense
                </button>
            </div>
        </form>
    );
};
