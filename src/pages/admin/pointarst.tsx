import { signIn, signOut, useSession } from "next-auth/react";
import { Tasks } from "../../components/Tasks/Tasks";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../server/auth";
import Admin from "../../layouts/Admin";

export default function Dashboard({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data: sessionData } = useSession();
    return (
        <Admin>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0f1235] to-[#090920]">
                <div className="container flex flex-col items-center justify-center gap-4 px-4 py-4">
                    {sessionData && (
                        <Tasks />
                    )}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <p className="text-center text-l">
                                {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
                            </p>
                            <button
                                className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={sessionData ? () => void signOut() : () => void signIn()}
                            >
                                {sessionData ? "Sign out" : "Sign in"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </Admin>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}
