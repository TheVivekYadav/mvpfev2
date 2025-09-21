// @ts-nocheck
const SummaryCard = ({ title, amount, note, amountColor = 'text-gray-900' }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>
        <p className={`text-3xl font-bold mt-2 ${amountColor}`}>${amount}</p>
        <p className="text-sm text-gray-400 mt-1">{note}</p>
    </div>
);

export default SummaryCard;