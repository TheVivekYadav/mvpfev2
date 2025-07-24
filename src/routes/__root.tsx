import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import {Navbar} from "../components/Nav.tsx";
import {Footer} from "../components/Footer.tsx";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Outlet />
        <Footer></Footer>
    </React.Fragment>
  )
}
