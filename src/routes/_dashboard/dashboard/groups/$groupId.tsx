import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import AddButton from '../../../../components/ui/AddButton';
import { useAppStore } from '../../../../store/AppStore';
import { showErrorToast } from '../../../../utils/toast';

export const Route = createFileRoute('/_dashboard/dashboard/groups/$groupId')({
  loader: async ({ params }) => {
    // Try to get from store first, then API
    const store = useAppStore.getState();
    const cachedGroup = store.groups.find((g: any) => g._id === params.groupId);

    if (cachedGroup) {
      store.selectedGroup = cachedGroup;
      return cachedGroup;
    }

    // If not in cache, fetch from API
    const group = await store.getGroupById(params.groupId);
    return group;
  },
  component: GroupLayout,
})

function GroupLayout() {
  // Move useParams inside the component
  const { groupId } = Route.useParams()
  const group = Route.useLoaderData()

  // @ts-ignore
  const { selectedGroup, setSelectedGroup } = useAppStore();
  useEffect(() => {
    if (group && (!selectedGroup || selectedGroup._id !== group._id)) {
      setSelectedGroup(group);
    }
  }, [group, selectedGroup, setSelectedGroup]);


  if (!group) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">Group not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-r from-green-500 to-blue-500">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold">{group.name}</h1>
          <p className="text-lg opacity-90">{group.description}</p>
        </div>
      </div>

      {/* Members and Add Expense */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Members</span>
          <div className="flex -space-x-2">
            {group.members?.length > 0 ? (
              group.members.map((member: any, index: number) => (
                <div
                  key={member.id || index}
                  className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-medium"
                  style={{ zIndex: group.members.length - index }}
                  title={member.name}
                >
                  {member.avatar || member.name?.[0]?.toUpperCase() || '👤'}
                </div>
              ))
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-medium">
                👤
              </div>
            )}
          </div>
        </div>
        <AddButton name="Add Member" onClick={() => { showErrorToast("Need to implement is") }} />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          <Link
            to="/dashboard/groups/$groupId/expenses"
            params={{ groupId }}
            className="px-6 py-3 font-medium transition-colors text-gray-500 hover:text-gray-700 [&.active]:text-blue-600 [&.active]:border-b-2 [&.active]:border-blue-600"
            activeOptions={{ exact: false }}
          >
            Expenses
          </Link>
          <Link
            to="/dashboard/groups/$groupId/balances"
            params={{ groupId }}
            className="px-6 py-3 font-medium transition-colors text-gray-500 hover:text-gray-700 [&.active]:text-blue-600 [&.active]:border-b-2 [&.active]:border-blue-600"
            activeOptions={{ exact: false }}
          >
            Balances & Settle
          </Link>
          <Link
            to="/dashboard/groups/$groupId/settleup"
            params={{ groupId }}
            className="px-6 py-3 font-medium transition-colors text-gray-500 hover:text-gray-700 [&.active]:text-blue-600 [&.active]:border-b-2 [&.active]:border-blue-600"
            activeOptions={{ exact: false }}
          >
            Settle Up
          </Link>
        </div>

        {/* This is where child routes will render */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}