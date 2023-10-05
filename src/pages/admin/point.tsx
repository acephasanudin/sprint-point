import React from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../server/auth";
import Points from "../../components/Points/Points";
import Admin from "../../layouts/Admin";
import CardGeneratePoint from "../../components/Cards/CardGeneratePoint";
import CardSprint from "../../components/Cards/CardSprint";

export default function PointPage({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Admin>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardGeneratePoint />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardSprint />
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <Points />
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
