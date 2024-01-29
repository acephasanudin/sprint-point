import { api } from "../../utils/api";
import { useRouter } from "next/router";

export function CardTask() {
    const router = useRouter();
    const taskId = useRouter().query.slug as string;
    let taskIds: string[] | undefined = [];
    let iTask = 0;
    const { data: task, isLoading, isError, isSuccess } = api.task.findOne.useQuery(taskId);
    if (isLoading) return <div className="skeleton w-full h-32"></div>
    if (isError) return <p>Error :(</p>
    if (isSuccess) {
        taskIds = localStorage.getItem("taskIds")?.split(',');
        iTask = taskIds?.indexOf(taskId) || 0;
    }

    const nextPrevPage = (navigate: number) => {
        let id = taskIds?.[iTask];
        const taskLength = (taskIds?.length || 1) - 1;
        if (navigate === 0) id = (iTask - 1 < 0) ? taskIds?.[taskLength] : taskIds?.[iTask - 1]
        if (navigate === 1) id = (iTask + 1 > taskLength) ? taskIds?.[0] : taskIds?.[iTask + 1]

        router.push(`/admin/points/${id}`);
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="badge badge-primary badge-outline">{task?.status}</div>
                <h2 className="card-title">{task?.name}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-circle btn-primary" onClick={() => nextPrevPage(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="join">
                        <input className="join-item btn btn-square" type="radio" name="options" aria-label={`${iTask + 1} / ${taskIds?.length}`} checked />
                    </div>
                    <button className="btn btn-circle btn-primary" onClick={() => nextPrevPage(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
