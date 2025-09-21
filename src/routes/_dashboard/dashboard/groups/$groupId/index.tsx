import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/dashboard/groups/$groupId/')({
  beforeLoad: ({ params }) => {
    
    throw redirect({
      to: '/dashboard/groups/$groupId/expenses',
      params: { groupId: params.groupId }
    })
  }
})