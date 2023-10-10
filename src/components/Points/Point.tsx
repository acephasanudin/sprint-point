import toast from "react-hot-toast";
import type { TaskProps, TaskData } from "../../types";
import { api } from "../../utils/api";
import { ProfileOptions } from "../Profiles/ProfileOptions";
import { SprintOptions } from "../Sprints/SprintOptions";

export function Point({ task }: TaskProps) {
    const { data: profiles, isLoading, isError } = api.profile.all.useQuery();
    const { data: sprints, isLoading: isSprintLoading, isError: isSprintError } = api.sprint.all.useQuery();

    const { id, name, sprintId, point, review, testing, status, assigneeId } = task
    const trpc = api.useContext();
    const { mutate: updateMutation } = api.task.update.useMutation({
        onMutate: async (data: any) => {
            await trpc.task.all.cancel()
            const previousQuests = trpc.task.all.getData()

            trpc.task.all.setData(undefined, (prev: any) => {
                if (!prev) return previousQuests
                return prev.map((t: any) => {
                    if (t.id === id) {
                        return ({
                            ...t,
                            assigneeId: data.assigneeId,
                            sprintId: data.sprintId,
                            point: data.point,
                            review: data.review,
                            testing: data.testing,
                        })
                    }
                    return t
                })
            })

            return { previousQuests }
        },

        onError: (_err, _status, context) => {
            toast.error(`An error occured when updating task`)
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousQuests)
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    if (isLoading) return <option>Loading profile 🔄</option>
    if (isError) return <option>Error fetching profile ❌</option>

    if (isSprintLoading) return <option>Loading sprint 🔄</option>
    if (isSprintError) return <option>Error fetching sprint ❌</option>

    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                [{id}] {name?.substring(0, 50)}...
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={assigneeId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, assigneeId: e.target.value });
                    }
                    }>
                    <option value=""></option>
                    {profiles.length ?
                        profiles.map((profile: any) => {
                            return <ProfileOptions key={profile.id} profile={profile} />
                        })
                        : <option>Profile not found...</option>}
                </select>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={sprintId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, sprintId: e.target.value });
                    }
                    }>
                    <option value=""></option>
                    {sprints.length ?
                        sprints.map((sprint: any) => {
                            return <SprintOptions key={sprint.id} sprint={sprint} />
                        })
                        : <option>Sprint not found...</option>}
                </select>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={point?.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, point: parseFloat(e.target.value) });
                    }
                    }>
                    <option value="0">0</option>
                    <option value="0.25">0.25</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={review?.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, review: parseFloat(e.target.value) });
                    }
                    }>
                    <option value="0">0</option>
                    <option value="0.25">0.25</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={testing?.toString()} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, testing: parseFloat(e.target.value) });
                    }
                    }>
                    <option value="0">0</option>
                    <option value="0.25">0.25</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {status === "in review" ? <i className="fas fa-circle text-blue-500 mr-2"></i> : null}
                {status === "completed" ? <i className="fas fa-circle text-gray-900 mr-2"></i> : null}
                {status === "in progress" ? <i className="fas fa-circle text-emerald-500 mr-2"></i> : null}
                {status === "waiting for testing" ? <i className="fas fa-circle text-orange-500 mr-2"></i> : null}
                {status === "ready to deploy" ? <i className="fas fa-circle text-white-500 mr-2"></i> : null}
                {status}
            </td>
        </tr>
    )
}
