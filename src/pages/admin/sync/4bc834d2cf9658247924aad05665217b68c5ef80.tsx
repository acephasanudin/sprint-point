import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../utils/api";
import { BottomNav } from "../../../components/Navigations/BottomNav";
import { TablePoints } from "../../../components/Points/TablePoints";
import { CardTask } from "../../../components/Tasks/CardTask";
import { Themes } from "../../../components/Navigations/Themes";
import loading from "../../../../public/loading.gif";
import done from "../../../../public/done.gif";
import Image from 'next/image';

export default function Points() {
    const router = useRouter();

    const { data, isLoading, isError, isSuccess } = api.task.syncTaskBySprint.useQuery();
    if (isLoading) return <div className="md:mx-center flex items-center justify-center h-screen"><div className="avatar"><div className="w-80 h-80 rounded-full"><Image src={loading} alt="" /></div></div></div>
    if (isError) return <p>Error :(</p>

    return (
        <div className="md:mx-center flex items-center justify-center h-screen">
            <div className="avatar">
                <div className="w-80 h-80 rounded-full">
                    <Image src={done} alt="" />
                </div>
            </div>
        </div>
    );
}
