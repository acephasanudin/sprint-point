import { TableProfile } from "./TableProfile";
import { api } from "../../utils/api";
import { useState } from "react";
import { Themes } from "../Navigations/Themes";

export function TableProfiles() {
    const [profileId, setProfileId] = useState<string | undefined>();
    const [sprintId, setSprintId] = useState<string | undefined>();
    const [teamId, setTeamId] = useState<string | undefined>();
    const { data: profiles, isLoading, isError } = api.profile.all.useQuery({ teamId, profileId, sprintId });
    const { data: profileFilter } = api.profile.all.useQuery({ teamId });
    const { data: sprints } = api.sprint.all.useQuery();
    const { data: teams } = api.team.all.useQuery();

    if (isLoading) return
    if (isError) return <p>Error :(</p>

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                        <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                                </svg>
                            </svg>
                        </button>
                    </button>
                    <dialog id="filter-modal" className="modal" onClose={() => (document.getElementById("filter-modal") as HTMLDialogElement).close()}>
                        <div className="modal-box mx-auto">
                            <h3 className="font-bold text-lg">Filters</h3>
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
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                                <button>close</button>
                            </form>
                        </form>
                    </dialog >
                </div >
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">Profile</a>
                </div>
                <Themes />
            </div >
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>
                            <div className="tooltip tooltip-primary tooltip-left" data-tip="Point/Review/Testing">
                                P/R/T
                            </div>
                        </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.length ?
                        profiles.map((profile: any) => {
                            return <TableProfile key={profile.id} profile={profile} />
                        })
                        : <tr>
                            <td colSpan={4} className="text-center">No profile</td></tr>}
                </tbody>
            </table>
        </>
    );
}
