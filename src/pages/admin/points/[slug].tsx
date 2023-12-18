import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../utils/api";
import { BottomNav } from "../../../components/Navigations/BottomNav";
import { TablePoints } from "../../../components/Points/TablePoints";
import { CardTask } from "../../../components/Tasks/CardTask";
import { Themes } from "../../../components/Navigations/Themes";

export default function Points() {
    const router = useRouter();
    const [id, setId] = useState<string>("");

    const trpc = api.useContext();
    const { mutate: findTask } = api.task.findTask.useMutation({
        onMutate: async (data: any) => {
        },
        onSuccess: (_, id) => {
            router.push(`/admin/points/${id}`);
        },
        onError: () => {
        },
        onSettled: async () => {
            await trpc.task.all.invalidate();
        },
    });

    return (
        <main >
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                </div>
                <div className="navbar-center">
                    <input onPaste={(e) => { findTask(e.clipboardData.getData('text').replace('https://app.clickup.com/t/', '').replace('#', '')) }} id="task-id" type="text" placeholder="Link / Clickup ID ..." className="input w-full" />
                </div>
                <Themes />
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <CardTask />
                    <div className="divider divider-primary">Points</div>
                    <TablePoints type="point" />
                    <div className="divider divider-secondary">Reviews</div>
                    <TablePoints type="review" />
                    <div className="divider divider-accent">Testings</div>
                    <TablePoints type="testing" />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
