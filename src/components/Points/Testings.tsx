import React from "react";
import PropTypes from "prop-types";
import { PicPoint } from "./PicPoint";
import { api } from "../../utils/api";
import { Table } from "flowbite-react";

type PointsProps = {
    taskId: string;
};
export default function Testings({ taskId }: PointsProps) {
    const { data: points, isLoading, isError } = api.point.testings.useQuery(taskId);
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
                                return <PicPoint type="testing" taskId={taskId} key={point.id} pointObj={point} last={true} />
                            }
                            return <PicPoint type="testing" taskId={taskId} key={point.id} pointObj={point} />
                        })
                        : <PicPoint type="testing" taskId={taskId} last={true} />}
                </Table.Body>
            </Table>
        </div >
    );
}
