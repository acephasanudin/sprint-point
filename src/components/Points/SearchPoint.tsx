import { useState } from "react"
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { SprintOptions } from "../Sprints/SprintOptions";
import { ProfileOptions } from "../Profiles/ProfileOptions";
import { FolderOptions } from "../Folders/FolderOptions";

export function SearchPoint() {
    const { data: sprints, isLoading: isSprintLoading, isError: isSprintError } = api.sprint.all.useQuery();
    const { data: profiles, isLoading: isProfileLoading, isError: isProfileError } = api.profile.all.useQuery();
    const { data: folders, isLoading: isFolderLoading, isError: isFolderError } = api.folder.all.useQuery();
    const [id, setId] = useState("")
    const [type, setType] = useState("")
    const [sprintId, setSprintId] = useState("")
    const [profileId, setProfileId] = useState("")
    const [folderId, setFolderId] = useState("")

    const trpc = api.useContext();

    const { mutate: syncClickup } = api.task.syncClickup.useMutation({
        onError: (context: any) => {
            toast.error("An error occured when syncing task")
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousTasks)
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    const { mutate: findTask } = api.task.findTask.useMutation({
        onError: (context: any) => {
            toast.error("An error occured when filtering task")
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousTasks)
        },
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    const { mutate: mutateOptions } = api.task.setOptions.useMutation({
        onMutate: async (data: any) => {
            setId(data.id)
            setType(data.type)
            setSprintId(data.sprintId)
            setProfileId(data.profileId)
            setFolderId(data.folderId)
            await trpc.task.all.invalidate()
            await trpc.task.all.refetch()
        },
        onError: (context: any) => {
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

    if (isFolderLoading) return <option>Loading folder 🔄</option>
    if (isFolderError) return <option>Error fetching folder ❌</option>

    return (
        <div className="float-right">
            <form onSubmit={(e) => {
                e.preventDefault()
                // syncClickup()
                findTask({ id })
            }} className="flex gap-2">
                <select value={folderId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    onChange={(e) => {
                            mutateOptions({ folderId: e.target.value, id, type, sprintId, profileId })
                    }
                    }>
                    <option value="">All Folder</option>
                    {folders.length ?
                        folders.map((folder: any) => {
                            return <FolderOptions key={folder.id} folder={folder} />
                        })
                        : <option>Folder not found...</option>}
                </select>
                <select value={profileId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    onChange={(e) => {
                        mutateOptions({ profileId: e.target.value, id, type, sprintId, folderId })
                    }
                    }>
                    <option value="">All Profile</option>
                    {profiles.length ?
                        profiles.map((profile: any) => {
                            return <ProfileOptions key={profile.id} profile={profile} />
                        })
                        : <option>Profile not found...</option>}
                </select>
                <select value={sprintId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 mr-3"
                    onChange={(e) => {
                        mutateOptions({ sprintId: e.target.value, id, type, profileId, folderId })
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
                        mutateOptions({ type: e.target.value, id, sprintId, profileId, folderId})
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
                        mutateOptions({ id: e.target.value, type, sprintId, profileId, folderId })
                    }}
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Syncing
                </button>
            </form>
        </div>
    )
}
