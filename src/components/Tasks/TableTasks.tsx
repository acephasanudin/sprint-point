import { Table } from "flowbite-react";
import { api } from "../../utils/api";

import TableTask from "./TableTask";

export default function TableTasks() {
    const { data: tasks, isLoading, isError } = api.task.all.useQuery();
    if (isLoading) return <div>Loading tasks 🔄</div>
    if (isError) return <div>Error fetching tasks ❌</div>

    return (
        <div className="p-4">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Task</Table.HeadCell>
                    <Table.HeadCell>Point</Table.HeadCell>
                    <Table.HeadCell className="hidden sm:table-cell">Review</Table.HeadCell>
                    <Table.HeadCell className="hidden sm:table-cell">Testing</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Detail</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {tasks.length ?
                        tasks.map((task: any) => {
                            return <TableTask key={task.id} task={task} />
                        })
                        : <tr>Task not found...</tr>}
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Clickup Task
                        </Table.Cell>
                        <Table.Cell>0</Table.Cell>
                        <Table.Cell className="hidden sm:table-cell">0</Table.Cell>
                        <Table.Cell className="hidden sm:table-cell">0</Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Detail
                            </a>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};
