import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "../utils/api";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Sprint Point Calculator</title>
            </Head>
            <Component {...pageProps} />
            <Toaster />
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
