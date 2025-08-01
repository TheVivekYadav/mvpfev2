import {createFileRoute} from '@tanstack/react-router'
import {Register} from '../components/Register.tsx'

export const Route = createFileRoute('/register')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Register></Register>
}
