import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_dashboard/dashboard/_group-detail/groups/_groupId/balances/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_dashboard/dashboard/_group-detail/groups/_groupId/balances/"!
    </div>
  )
}
