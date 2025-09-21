import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard/dashboard/groups/$groupId/balances')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = Route.useParams();

  console.log('Balances tab mounted, groupId:', groupId);

  const mockBalances = [
    { name: 'Alex', owes: 0, owed: 125, net: 125 },
    { name: 'Ben', owes: 75, owed: 150, net: 75 },
    { name: 'Chloe', owes: 200, owed: 0, net: -200 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Balances & Settle Up</h2>

      <div className="grid gap-4">
        {mockBalances.map(balance => (
          <div key={balance.name} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{balance.name}</h3>
                <div className="text-sm text-gray-600">
                  <span>Owes: ${balance.owes} • </span>
                  <span>Owed: ${balance.owed}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xl font-bold ${balance.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {balance.net >= 0 ? `+$${balance.net}` : `-$${Math.abs(balance.net)}`}
                </span>
                {balance.net < 0 && (
                  <button className="block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                    Settle Up
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}