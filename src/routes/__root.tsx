import * as React from 'react'
import {createRootRoute, Outlet} from '@tanstack/react-router'
import {Navbar} from "../components/Nav.tsx";
import {Footer} from "../components/Footer.tsx";

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </React.Fragment>
    )
}
