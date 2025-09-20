import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            // your meta tags and site config
        ],

    }),
    component: RootComponent,
})

function RootComponent() {

    return (
        <>
            <Outlet />

            {/* <TanStackRouterDevtools />
            <ReactQueryDevtools initialIsOpen={false} /> */}
        </>
    )
}