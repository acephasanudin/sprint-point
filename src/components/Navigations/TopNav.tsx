import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { api } from "../../utils/api";

export function TopNav() {
    const pathname = usePathname();
    const title = pathname?.split("/")[2]?.toUpperCase();
    function setTheme(theme: string) {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }
    useEffect(() => {
        const theme = localStorage.getItem("theme") ?? "dark";
        const taskId = localStorage.getItem("taskId") ?? "";
        document.getElementById("task-id")?.setAttribute("value", taskId);
        document.documentElement.setAttribute("data-theme", theme);
    }, []);

    const trpc = api.useContext();
    const { mutate: findTask } = api.task.findTask.useMutation({
        onMutate: async (data: string) => {
            const taskId = data.replace('https://app.clickup.com/t/', '').replace('#', '')
            await trpc.task.all.cancel()
            localStorage.setItem("taskId", taskId)
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
                {pathname === "/admin/tasks" ? <input id="task-id" onChange={(e) => { if (e.target.value.length > 5) findTask(e.target.value.replace('https://app.clickup.com/t/', '')) }} type="text" placeholder="Clickup ID ..." className="input w-full" /> : <a className="btn btn-ghost text-xl">{title}</a>}
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box h-[70vh] max-h-96 w-56 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="light"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('light')}
                            >
                                <span
                                    data-theme="light"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">light</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="dark"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('dark')}
                            >
                                <span
                                    data-theme="dark"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">dark</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="cupcake"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('cupcake')}
                            >
                                <span
                                    data-theme="cupcake"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">cupcake</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="bumblebee"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('bumblebee')}
                            >
                                <span
                                    data-theme="bumblebee"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">bumblebee</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="emerald"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('emerald')}
                            >
                                <span
                                    data-theme="emerald"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">emerald</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="corporate"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('corporate')}
                            >
                                <span
                                    data-theme="corporate"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">corporate</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="synthwave"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('synthwave')}
                            >
                                <span
                                    data-theme="synthwave"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">synthwave</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="retro"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('retro')}
                            >
                                <span
                                    data-theme="retro"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">retro</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="cyberpunk"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('cyberpunk')}
                            >
                                <span
                                    data-theme="cyberpunk"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">cyberpunk</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="valentine"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('valentine')}
                            >
                                <span
                                    data-theme="valentine"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">valentine</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="halloween"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('halloween')}
                            >
                                <span
                                    data-theme="halloween"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">halloween</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="garden"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('garden')}
                            >
                                <span
                                    data-theme="garden"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">garden</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="forest"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('forest')}
                            >
                                <span
                                    data-theme="forest"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">forest</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="aqua"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('aqua')}
                            >
                                <span
                                    data-theme="aqua"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">aqua</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="lofi"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('lofi')}
                            >
                                <span
                                    data-theme="lofi"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">lofi</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="pastel"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('pastel')}
                            >
                                <span
                                    data-theme="pastel"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">pastel</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="fantasy"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('fantasy')}
                            >
                                <span
                                    data-theme="fantasy"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">fantasy</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="wireframe"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('wireframe')}
                            >
                                <span
                                    data-theme="wireframe"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">wireframe</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="black"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('black')}
                            >
                                <span
                                    data-theme="black"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">black</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="luxury"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('luxury')}
                            >
                                <span
                                    data-theme="luxury"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">luxury</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left [&_svg]:visible"
                                data-set-theme="dracula"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('dracula')}
                            >
                                <span
                                    data-theme="dracula"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">dracula</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="cmyk"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('cmyk')}
                            >
                                <span
                                    data-theme="cmyk"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">cmyk</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="autumn"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('autumn')}
                            >
                                <span
                                    data-theme="autumn"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">autumn</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="business"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('business')}
                            >
                                <span
                                    data-theme="business"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">business</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="acid"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('acid')}
                            >
                                <span
                                    data-theme="acid"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">acid</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="lemonade"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('lemonade')}
                            >
                                <span
                                    data-theme="lemonade"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">lemonade</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="night"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('night')}
                            >
                                <span
                                    data-theme="night"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">night</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="coffee"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('coffee')}
                            >
                                <span
                                    data-theme="coffee"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">coffee</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="winter"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('winter')}
                            >
                                <span
                                    data-theme="winter"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">winter</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="dim"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('dim')}
                            >
                                <span
                                    data-theme="dim"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">dim</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="nord"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('nord')}
                            >
                                <span
                                    data-theme="nord"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">nord</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="outline-base-content overflow-hidden rounded-lg text-left"
                                data-set-theme="sunset"
                                data-act-class="[&_svg]:visible"
                                onClick={() => setTheme('sunset')}
                            >
                                <span
                                    data-theme="sunset"
                                    className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                                >
                                    <span className="grid grid-cols-5 grid-rows-3">
                                        <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="invisible h-3 w-3 shrink-0"
                                            >
                                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                            </svg>{" "}
                                            <span className="flex-grow text-sm">sunset</span>{" "}
                                            <span
                                                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                                                data-svelte-h="svelte-dkjulf"
                                            >
                                                <span className="bg-primary w-2 rounded" />{" "}
                                                <span className="bg-secondary w-2 rounded" />{" "}
                                                <span className="bg-accent w-2 rounded" />{" "}
                                                <span className="bg-neutral w-2 rounded" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </button>{" "}
                        </div>
                    </ul>
                </div>
                <button className="btn btn-ghost btn-circle" onClick={() => signOut()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                </button>
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
