import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

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

            <TanStackRouterDevtools />
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}