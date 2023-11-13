import React from "react";
import { Table } from "flowbite-react";
import { PicPoint } from "./PicPoint";
import { api } from "../../utils/api";

type PointsProps = {
    taskId: string;
};
export default function Points({ taskId }: PointsProps) {
    const { data: points, isLoading, isError } = api.point.reviews.useQuery(taskId);

    if (isLoading) return <div>Loading tasks 🔄</div>
    if (isError) return <div>Error fetching tasks ❌</div>
    return (
        <div className="p-4">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>PIC</Table.HeadCell>
                    <Table.HeadCell>Sprint</Table.HeadCell>
                    <Table.HeadCell>Point</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Detail</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {points.length ?
                        points.map((point: any, i: number) => {
                            if (points.length === i + 1) {
                                return <PicPoint type="point" taskId={taskId} key={point.id} pointObj={point} last={true} />
                            }
                            return <PicPoint type="point" taskId={taskId} key={point.id} pointObj={point} />
                        })
                        : <PicPoint type="point" taskId={taskId} last={true} />}
                </Table.Body>
            </Table>
        </div>
    );
}
