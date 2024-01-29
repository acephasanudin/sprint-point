import { TableTask } from "./TableTask";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { Themes } from "../Navigations/Themes";
import { useRouter } from 'next/navigation';

export function TableTasks() {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const [profileId, setProfileId] = useState<string>() || "";
    const [sprintId, setSprintId] = useState<string>() || "";
    const [teamId, setTeamId] = useState<string>() || "";
    const { data: tasks, isLoading, isError } = api.task.all.useQuery({ id, profileId, sprintId, teamId });
    const { data: profileFilter } = api.profile.all.useQuery({ teamId });
    const { data: sprints } = api.sprint.all.useQuery();
    const { data: teams } = api.team.all.useQuery();


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
    const { mutate: syncTask } = api.task.syncTaskBySprint.useMutation()

    const resetFilter = () => {
        setProfileId(() => "");
        setSprintId(() => "");
        setTeamId(() => "");
    }

    useEffect(() => {
        if (profileId || profileId === "") localStorage.setItem("tProfileId", profileId)
        if (sprintId || sprintId === "") localStorage.setItem("tSprintId", sprintId)
        if (teamId || teamId === "") localStorage.setItem("tTeamId", teamId)
        setProfileId(localStorage.getItem("tProfileId") || "");
        setSprintId(localStorage.getItem("tSprintId") || "");
        setTeamId(localStorage.getItem("tTeamId") || "");
    }, [profileId, sprintId, teamId])

    if (isLoading) return
    if (isError) return <p>Error :(</p>
    // <button className="btn btn-ghost btn-circle" onClick={() => syncTask("901600624440")}>
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    //     </svg>
    // </button>
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                        </svg>
                    </button>
                    <dialog id="filter-modal" className="modal" onClose={() => (document.getElementById("filter-modal") as HTMLDialogElement).close()}>
                        <div className="modal-box mx-auto">
                            <h3 className="float-left font-bold text-lg">Filters</h3>
                            <div className="tooltip tooltip-secondary tooltip-bottom float-right" data-tip="Reset Filter">
                                <button className="btn btn-ghost btn-circle" onClick={() => resetFilter()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </button>
                            </div>
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text">Sprint</span>
                                </label>
                                <select value={sprintId} className="select select-primary w-full"
                                    onChange={(e) => {
                                        setSprintId(e.target.value);
                                    }}
                                >
                                    <option disabled selected>Which Sprint?</option>
                                    <option value=""></option>
                                    {sprints?.length ?
                                        sprints.map((sprint: any) => {
                                            return <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                                        })
                                        : <option>No sprint</option>}
                                </select>
                            </div>
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text">Team</span>
                                </label>
                                <select value={teamId} className="select select-primary w-full"
                                    onChange={(e) => {
                                        setTeamId(e.target.value);
                                    }}
                                >
                                    <option disabled selected>Which Team?</option>
                                    <option value=""></option>
                                    {teams?.length ?
                                        teams.map((team: any) => {
                                            return <option key={team.id} value={team.id}>{team.name}</option>
                                        })
                                        : <option>No team</option>}
                                </select>
                            </div>
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text">PIC</span>
                                </label>
                                <select value={profileId} className="select select-primary w-full"
                                    onChange={(e) => {
                                        setProfileId(e.target.value);
                                    }}
                                >
                                    <option disabled selected>Who is the PIC?</option>
                                    <option value=""></option>
                                    {profileFilter?.length ?
                                        profileFilter.map((profile: any) => {
                                            return <option key={profile.id} value={profile.id}>{profile.username}</option>
                                        })
                                        : <option>No profiles</option>}
                                </select>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog >
                </div >
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
