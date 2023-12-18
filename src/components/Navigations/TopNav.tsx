import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { api } from "../../utils/api";
import { useState } from "react";

export function TopNav() {
    const [taskId, setTaskId] = useState<string>();
    const pathname = usePathname();
    const title = pathname?.split("/")[2]?.toUpperCase();
    function setTheme(theme: string) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }
    useEffect(() => {
        const theme = localStorage.getItem("theme") ?? "dark";
        document.documentElement.setAttribute("data-theme", theme);
        document.getElementById("task-id")?.setAttribute("value", taskId || "");
    }, []);

    useEffect(() => {
        const id = localStorage.getItem("taskId") || "";
        setTaskId(id);
        localStorage.setItem("taskId", taskId || "");
    }, [taskId])

    const trpc = api.useContext();
    const { mutate: findTask } = api.task.findTask.useMutation({
        onMutate: async (data: string) => {
            (data === "") ? localStorage.removeItem("taskId") : localStorage.setItem("taskId", data)
            await trpc.task.all.cancel()
        },
        onError: (context: any) => {
            if (!context) return
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <button className={pathname === "/admin/tasks" ? "btn btn-ghost btn-circle" : "hidden"} onClick={() => (document.getElementById("filter-modal") as HTMLDialogElement).showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                </button>
                <dialog id="filter-modal" className="modal" onClose={() => (document.getElementById("filter-modal") as HTMLDialogElement).close()}>
                    <div className="modal-box mx-auto">
                        <h3 className="font-bold text-lg">Filters</h3>
                        <div className="form-control w-full mt-2">
                            <label className="label">
                                <span className="label-text">List ID</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mt-2">
                            <label className="label">
                                <span className="label-text">Task ID</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="navbar-center">
                <input id="task-id" onChange={(e) => { if (e.target.value.length > 5 || e.target.value.length === 0) findTask(e.target.value.replace('https://app.clickup.com/t/', '').replace('#', '')) }} type="text" placeholder="Link / Clickup ID ..." className="input w-full" />
                <input id="point" onChange={(e) => { if (e.target.value.length > 5 || e.target.value.length === 0) findPoint(e.target.value.replace('https://app.clickup.com/t/', '').replace('#', '')) }} type="text" placeholder="Link / Clickup ID ..." className="input w-full hidden" />
                <a className="btn btn-ghost text-xl hidden">{title}</a>
            </div>
        </div>
    );
}



// <select defaultValue={""} className="select select-primary w-full mt-2">
//     <option disabled selected value="">Select folder?</option>
//     <option value="">All Folder</option>
//     <option value="">Game of Thrones</option>
//     <option value="">Lost</option>
//     <option value="">Breaking Bad</option>
//     <option value="">Walking Dead</option>
// </select>
// <select defaultValue={""} className="select select-primary w-full mt-2">
//     <option disabled selected value="">Select profile?</option>
//     <option value="">All Profile</option>
//     <option value="">Game of Thrones</option>
//     <option value="">Lost</option>
//     <option value="">Breaking Bad</option>
//     <option value="">Walking Dead</option>
// </select>
// <select defaultValue={""} className="select select-primary w-full mt-2">
//     <option disabled selected value="">Select sprint?</option>
//     <option value="">All Sprint</option>
//     <option value="">Game of Thrones</option>
//     <option value="">Lost</option>
//     <option value="">Breaking Bad</option>
//     <option value="">Walking Dead</option>
// </select>
