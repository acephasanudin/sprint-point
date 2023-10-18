import React from "react";
import PropTypes from "prop-types";
import { PicPoint } from "./PicPoint";
import { api } from "../../utils/api";

type PointsProps = {
    taskId: string;
    color?: "light" | "dark";
};
export default function Testings({ taskId, color }: PointsProps) {
    // get api point testings with taskId
    const { data: points, isLoading, isError } = api.point.testings.useQuery(taskId);
    // const { data: points, isLoading, isError } = api.point.testings.useQuery(taskId);

    if (isLoading) return <div>Loading tasks 🔄</div>
    if (isError) return <div>Error fetching tasks ❌</div>
    return (
        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg float-left " +
                                    (color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                Testing List
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    PIC
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Point
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {points.length ?
                                points.map((point: any, i: number) => {
                                    if (points.length === i + 1) {
                                        return <PicPoint type="testing" taskId={taskId} key={point.id} pointObj={point} last={true} />
                                    }
                                    return <PicPoint type="testing" taskId={taskId} key={point.id} pointObj={point} />
                                })
                                : <PicPoint type="testing" taskId={taskId} last={true} />}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Testings.defaultProps = {
    color: "light",
};

Testings.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
