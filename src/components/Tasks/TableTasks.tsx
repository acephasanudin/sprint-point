import { TableTask } from "./TableTask";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

export function TableTasks() {
    const { data: tasks, isLoading, isError } = api.task.all.useQuery();

    if (isLoading) return <div className="skeleton w-full h-32"></div>
    if (isError) return <p>Error :(</p>

    return (
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
                {tasks.length ?
                    tasks.map((task: any) => {
                        return <TableTask key={task.id} task={task} />
                    })
                    : <tr>
                        <td colSpan={4} className="text-center">No tasks</td></tr>}
            </tbody>
        </table>
    );
}