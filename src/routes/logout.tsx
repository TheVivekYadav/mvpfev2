import {createFileRoute, useNavigate} from '@tanstack/react-router'
import authService from "../api/authService.ts";

export const Route = createFileRoute('/logout')({
    component: RouteComponent,
})

function RouteComponent() {

    const navigate = useNavigate();

    function handleLogout() {
        authService.logout().then(() => {
            navigate({to: "/login"})
        })
    }

    return <>
        <button onClick={handleLogout}>Logout</button>
    </>
}
