import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { Themes } from "../Navigations/Themes";
import { SummaryPoints } from "./SummaryPoints";
import { TableSummaryPoints } from "./TableSummaryPoints";
import { VelocityTotalPoints } from "./VelocityTotalPoints";
import { CompletedTotalPoints } from "./CompletedTotalPoints";

export function Dashboards() {
    const [sprintId, setSprintId] = useState<string>() || "";
    const [status, setStatus] = useState<string>() || "";
    const { data: lastSprint } = api.sprint.lastSprint.useQuery();
    const { data: profiles } = api.profile.all.useQuery({});
    const { data: sprints } = api.sprint.all.useQuery();
    const trpc = api.useContext();
    const dataReport = {
        profiles,
        sprints
    }

    const { mutate: generateMutation } = api.point.generate.useMutation({
        onMutate: async (data: any) => {
            await trpc.point.all.cancel()
        },
        onSuccess: (_, payload) => {
            const msg = `Report ${payload.status || "planning"} generated!`
            toast(
                () => (
                    <span>
                        {msg}
                    </span>
                ),
                {
                    icon: '🔥',
                }
            );
        },
        onError: (_, payload) => {
            const msg = `Generate ${payload.status || "planning"} report failed!`
            toast(
                () => (
                    <span>
                        {msg}
                    </span>
                ),
                {
                    icon: '🔥',
                }
            );
        },
        onSettled: async () => {
            await trpc.point.all.invalidate();
        },
    });

    return (
        <>
            <div className="container mx-auto pb-16">
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                            </svg>
                        </button>
                        <dialog id="filter-modal" className="modal" onClose={() => (document.getElementById("filter-modal") as HTMLDialogElement).close()}>
                            <div className="modal-box mx-auto">
                                <h3 className="float-left font-bold text-lg">Generate Reports</h3>
                                <div className="tooltip tooltip-secondary tooltip-left float-right" data-tip="History generated report">
                                    <button className="btn btn-ghost btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
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
                                        {sprints?.length ?
                                            sprints.map((sprint: any) => {
                                                return <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                                            })
                                            : <option>No sprint</option>}
                                    </select>
                                </div>
                                <div className="form-control w-full mt-2">
                                    <label className="label">
                                        <span className="label-text">Type</span>
                                    </label>
                                    <select value={status} className="select select-primary w-full"
                                        onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}
                                    >
                                        <option selected value="planning">Planning</option>
                                        <option value="actual">Actual</option>
                                    </select>
                                </div>
                                <br />
                                <form method="dialog" className="modal-backdrop">
                                    <div className="form-control w-full mt-2">
                                        <button className="btn btn-primary" onClick={() => generateMutation({ sprintId, status })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                            </svg>
                                            Generate
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog >
                    </div >
                    <div className="navbar-center">
                        <a className="btn btn-ghost text-xl">Dashboard</a>
                    </div>
                    <Themes />
                </div >
            </div >
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <SummaryPoints profiles={profiles} />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">
                        <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </button>
                        Table Summary Points
                    </div>
                    <TableSummaryPoints profiles={profiles} />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">Velocity Total Point</div>
                    <VelocityTotalPoints data={dataReport} />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">
                        <button className="btn btn-ghost btn-circle" onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </button>
                        Completed Total Point
                    </div>
                    <CompletedTotalPoints data={dataReport} />
                </div>
            </div>
        </>
    );
}
