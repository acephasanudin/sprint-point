import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../server/auth";
import Points from "../../../components/Points/Points";
import Reviews from "../../../components/Points/Reviews";
import Testings from "../../../components/Points/Testings";
import Admin from "../../../layouts/Admin";
import { Card } from "flowbite-react";
import Image from "next/image";
import { useRouter } from 'next/router'

export default function TaskPage({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return (
        <Admin>
            <div className="p-4">
                <Card className="max-w">
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Point</h5>
                    </div>
                    <div className="flow-root">
                        <Points taskId={router.query.slug as string} />
                    </div>
                </Card>
            </div>
            <div className="p-4">
                <Card className="max-w">
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Review</h5>
                    </div>
                    <div className="flow-root">
                        <Reviews taskId={router.query.slug as string} />
                    </div>
                </Card>
            </div>
            <div className="p-4">
                <Card className="max-w">
                    <div className="mb-4 flex items-center justify-between">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Testing</h5>
                    </div>
                    <div className="flow-root">
                        <Testings taskId={router.query.slug as string} />
                    </div>
                </Card>
            </div>
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

TaskPage.layout = Admin;
