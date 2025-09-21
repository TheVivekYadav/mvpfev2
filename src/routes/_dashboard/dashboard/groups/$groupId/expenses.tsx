import { createFileRoute } from '@tanstack/react-router';
import AddButton from '../../../../../components/ui/AddButton';
import { showErrorToast } from '../../../../../utils/toast';

export const Route = createFileRoute('/_dashboard/dashboard/groups/$groupId/expenses')({
  component: RouteComponent,
})

function RouteComponent() {
  // @ts-ignore
  const { groupId } = Route.useParams();

  const mockExpenses = [
    { id: 1, description: 'Hotel Booking', amount: 250, paidBy: 'Alex', date: '2024-01-15' },
    { id: 2, description: 'Flight Tickets', amount: 450, paidBy: 'Ben', date: '2024-01-16' },
    { id: 3, description: 'Dinner', amount: 85, paidBy: 'Chloe', date: '2024-01-17' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <AddButton name="Add Expense" onClick={() => { showErrorToast("Need to implement this") }} />
      </div>

      <div className="space-y-4">
        {mockExpenses.map(expense => (
          <div key={expense.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{expense.description}</h3>
                <p className="text-gray-600">Paid by {expense.paidBy} on {expense.date}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-green-600">${expense.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockExpenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No expenses yet</p>
          <p className="text-gray-400">Add your first expense to get started!</p>
        </div>
      )}
    </div>
  );
}