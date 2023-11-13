import React from "react";
import Admin from "../../layouts/Admin";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardBarChart from "../../components/Cards/CardBarChart";
import ProfilePoints from "../../components/Profiles/ProfilePoints";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../server/auth";

export default function Dashboard() {
    return (
        <Admin>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart />
                </div>
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <ProfilePoints />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardSocialTraffic />
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


// <Admin>
//     <div className="flex flex-wrap">
//         <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
//             <CardLineChart />
//         </div>
//         <div className="w-full xl:w-4/12 px-4">
//             <CardBarChart />
//         </div>
//     </div>
//     <div className="flex flex-wrap mt-4">
//         <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
//             <ProfilePoints />
//         </div>
//         <div className="w-full xl:w-4/12 px-4">
//             <CardSocialTraffic />
//         </div>
//     </div>
// </Admin>

Dashboard.layout = Admin;
