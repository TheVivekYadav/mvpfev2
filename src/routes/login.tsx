import {createFileRoute} from '@tanstack/react-router'
import {Login} from "../components/Login.tsx";

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="flex items-center justify-center h-screen p-4">
        <Login></Login>
    </div>
}
