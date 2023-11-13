import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "../utils/api";
import { useEffect } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    useEffect(() => {
        document.body.classList.add("text-gray-800");
        document.body.classList.add("dark:text-white");
        document.body.classList.add("bg-gray-100");
        document.body.classList.add("dark:bg-gray-900");
    }
    , []);
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
