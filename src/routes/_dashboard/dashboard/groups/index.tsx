import { createFileRoute, Outlet } from '@tanstack/react-router'
import Groups from '../../../../components/Groups'

export const Route = createFileRoute('/_dashboard/dashboard/groups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Groups />
    <Outlet />
  </div>
}
