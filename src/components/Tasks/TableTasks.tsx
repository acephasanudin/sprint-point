import { TableTask } from "./TableTask";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { Themes } from "../Navigations/Themes";
import { useRouter } from 'next/navigation';

export function TableTasks() {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const { data: tasks, isLoading, isError } = api.task.all.useQuery({ id, start: 0, limit: 30 });
    const trpc = api.useContext();
    const { mutate: findTask } = api.task.findTask.useMutation({
        onMutate: async (data: any) => {
        },
        onSuccess: () => {
            router.push(`/admin/points/${id}`);
        },
        onError: () => {
        },
        onSettled: async () => {
            await trpc.task.all.invalidate();
        },
    });
    if (isError) return <p>Error :(</p>

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                </div>
                <div className="navbar-center">
                    <input onPaste={(e) => { findTask(e.clipboardData.getData('text').replace('https://app.clickup.com/t/', '').replace('#', '')) }} id="task-id" onChange={(e) => { if (e.target.value.length > 5 || e.target.value.length === 0) setId(e.target.value.replace('https://app.clickup.com/t/', '').replace('#', '')) }} type="text" placeholder="Link / Clickup ID ..." className="input w-full" />
                </div>
                <Themes />
            </div>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>
                            <div className="tooltip tooltip-primary tooltip-left" data-tip="Point/Review/Testing">
                                P/R/T
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.length ?
                        tasks?.map((task: any) => {
                            return <TableTask key={task.id} task={task} />
                        })
                        : <tr>
                            <td colSpan={4} className="text-center">No tasks</td></tr>}
                </tbody>
            </table>
        </>
    );
}
