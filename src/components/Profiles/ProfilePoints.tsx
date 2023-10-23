import React from "react";
import { ProfilePoint } from "./ProfilePoint";
import { api } from "../../utils/api";

export default function ProfilePoints() {
    const [sprintId, setSprintId] = React.useState("");
    let sprintName = "";
    const { data: profiles, isLoading, isError } = api.profile.all.useQuery();
    const { data: sprints, isLoading: isSprintLoading, isError: isSprintError } = api.sprint.all.useQuery();
    if (sprintId) {
        sprintName = sprints?.find((sprint: any) => sprint.id === sprintId)?.name || "";
    }

    if (isLoading) return <div>Loading profiles 🔄</div>
    if (isError) return <div>Error fetching profiles ❌</div>
    if (isSprintLoading) return <div>Loading sprints 🔄</div>
    if (isSprintError) return <div>Error fetching sprints ❌</div>
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                {sprintId ? sprintName : "All sprints"}
                            </h3>
                        </div>
                        <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                            <select value={sprintId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => {
                                    setSprintId(e.target.value);
                                }
                                }>
                                <option value="">All sprints</option>
                                {sprints.length ?
                                    sprints.map((sprint: any) => {
                                        return <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                                    })
                                    : <option value="">Sprint not found...</option>}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Estimated
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Completed
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Review
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Testing
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length ?
                                profiles.map((profile: any) => {
                                    return <ProfilePoint sprintId={sprintId} key={profile.id} profile={profile} />
                                })
                                : <tr>Profile not found...</tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
