import { useState } from "react"
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { SearchTask } from "../../types";
import { SprintOptions } from "../Sprints/SprintOptions";
import { ProfileOptions } from "../Profiles/ProfileOptions";

export function SearchPoint() {
    const { data: sprints, isLoading: isSprintLoading, isError: isSprintError } = api.sprint.all.useQuery();
    const { data: profiles, isLoading: isProfileLoading, isError: isProfileError } = api.profile.all.useQuery();
    const [id, setId] = useState("")
    const [type, setType] = useState("")
    const [sprint, setSprint] = useState("")
    const [profile, setProfile] = useState("")

    const trpc = api.useContext();

    const { mutate } = api.task.setListId.useMutation({
        onMutate: async (data: any) => {
            setId('')
            setSprint('')
            setProfile('')
            await trpc.task.all.invalidate()
            await trpc.task.all.refetch()
        },
        onError: (newTask: any, context: any) => {
            toast.error("An error occured when creating task")
            setId(newTask.id)
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousTasks)
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    const { mutate: mutateSprint } = api.task.setSprintId.useMutation({
        onMutate: async (data: any) => {
            setSprint(data.sprint)
            setProfile(data.profile)
            await trpc.task.all.invalidate()
            await trpc.task.all.refetch()
        },
        onError: (newSprint: any, context: any) => {
            toast.error("An error occured when filtering task")
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousTasks)
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    if (isSprintLoading) return <option>Loading sprint 🔄</option>
    if (isSprintError) return <option>Error fetching sprint ❌</option>

    if (isProfileLoading) return <option>Loading profile 🔄</option>
    if (isProfileError) return <option>Error fetching profile ❌</option>

    return (
        <div className="float-right">
            <form onSubmit={(e) => {
                e.preventDefault()
                const result = SearchTask.safeParse({ id, type })

                if (!result.success) {
                    toast.error(result.error.format()._errors.join('\n'))
                    return
                }

                mutate({ id, type })
            }} className="flex gap-2">
                <select value={profile ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    onChange={(e) => {
                        mutateSprint({ profile: e.target.value, sprint })
                    }
                    }>
                    <option value="">All Profile</option>
                    {profiles.length ?
                        profiles.map((profile: any) => {
                            return <ProfileOptions key={profile.id} profile={profile} />
                        })
                        : <option>Profile not found...</option>}
                </select>
                <select value={sprint ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    onChange={(e) => {
                        mutateSprint({ profile, sprint: e.target.value })
                    }
                    }>
                    <option value="">All Sprint</option>
                    {sprints.length ?
                        sprints.map((sprint: any) => {
                            return <SprintOptions key={sprint.id} sprint={sprint} />
                        })
                        : <option>Sprint not found...</option>}
                </select>
                <select value={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        setType(e.target.value)
                    }
                    }>
                    <option value="list">List ID</option>
                    <option value="task">Task ID</option>
                </select>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    placeholder={type === "task" ? "Task ID ..." : "List ID ..."}
                    type="text" name="new-task" id="new-task"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 w-full sm:w-auto px-5 py-2.5 text-center hover:border-transparent rounded"
                >
                    Find Tasks
                </button>
            </form>
        </div>
    )
}
