import React from "react";
import { api } from "../../utils/api";
import { Sprint } from "./Sprint";

export default function Sprints() {
    const { data: sprints, isLoading, isError } = api.sprint.all.useQuery();

    if (isLoading) return <div>Loading sprint 🔄</div>
    if (isError) return <div>Error fetching sprints ❌</div>
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Sprint List
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    ID
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Report
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sprints.length ?
                                sprints.map((sprint: any) => {
                                    return <Sprint key={sprint.id} sprint={sprint} />
                                })
                                : <tr>Sprint not found...</tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
