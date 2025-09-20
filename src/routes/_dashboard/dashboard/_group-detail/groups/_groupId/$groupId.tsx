import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_dashboard/dashboard/_group-detail/groups/_groupId/$groupId',
)({
  loader: ({ params }) => console.log(params.groupId),
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = Route.useParams()
  return <div>Hello "/_dashboard/dashboard/_group-detail/groups/{groupId}"!</div>
}
