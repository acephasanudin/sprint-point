import { api } from "../../utils/api";
import { useRouter } from "next/router";

export function CardTask() {
    const taskId = useRouter().query.slug as string;
    const { data: task, isLoading, isError } = api.task.findOne.useQuery(taskId);
    if (isLoading) return <div className="skeleton w-full h-32"></div>
    if (isError) return <p>Error :(</p>

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="badge badge-primary badge-outline">{task?.status}</div>
                <h2 className="card-title">{task?.name}</h2>
            </div>
        </div>
    );
}
