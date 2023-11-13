import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../server/auth";
import Points from "../../../components/Points/PointValues";
import Reviews from "../../../components/Points/Reviews";
import Testings from "../../../components/Points/Testings";
import Admin from "../../../layouts/Admin";
import { useRouter } from 'next/router'

export default function PointPage({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    return (
        <Admin>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-6/12 mb-12 px-4">
                    <Points taskId={router.query.slug as string} />
                </div>
                <div className="w-full xl:w-6/12 mb-12 px-4">
                    <Reviews taskId={router.query.slug as string} />
                </div>
                <div className="w-full xl:w-6/12 mb-12 px-4">
                    <Testings taskId={router.query.slug as string} />
                </div>
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

PointPage.layout = Admin;
