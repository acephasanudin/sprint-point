import { Table } from 'flowbite-react';
import { TaskProps } from '../../types';
import Link from 'next/link';

export default function TableTask({ task }: TaskProps) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {task.name?.substring(0, 50)}...
            </Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell className="hidden sm:table-cell">0</Table.Cell>
            <Table.Cell className="hidden sm:table-cell">0</Table.Cell>
            <Table.Cell>
                <Link href={`/admin/tasks/${task.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Detail
                </Link>
            </Table.Cell>
        </Table.Row>
    )
}
