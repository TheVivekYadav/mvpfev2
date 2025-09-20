import { createFileRoute } from '@tanstack/react-router'
import Groups from '../../../components/Groups'

export const Route = createFileRoute(
  '/_dashboard/dashboard/groups',
)({
  component: Groups,
})
