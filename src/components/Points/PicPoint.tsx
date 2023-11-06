import toast from "react-hot-toast";
import type { PointProps } from "../../types";
import { api } from "../../utils/api";
import { ProfileOptions } from "../Profiles/ProfileOptions";
import { SprintOptions } from "../Sprints/SprintOptions";

export function PicPoint({ taskId, type, last, pointObj }: PointProps) {
    let { id, profileId, point, sprintId} = pointObj || {};
    const { data: profiles, isLoading: isProfileLoading, isError: isProfileError } = api.profile.all.useQuery();
    const { data: sprints, isLoading: isSprintLoading, isError: isSprintError } = api.sprint.all.useQuery();
    const trpc = api.useContext();
    const { mutate: updateMutation } = api.point.update.useMutation({
        onMutate: async (data: any) => {
            id = data.id ?? id
            sprintId = data.sprintId ?? sprintId
            profileId = data.profileId ?? profileId
            point = data.point ?? point
        }, 
        onSuccess: () => {
            toast.success('Point updated successfully ✅')
        },
        onError: () => {
            toast.error('Error updating point ❌')
        },
        onSettled: async () => {
            if (type === 'testing') await trpc.point.testings.invalidate(taskId)
            if (type === 'review') await trpc.point.reviews.invalidate(taskId)
        }
    });
    const { mutate: createMutation } = api.point.create.useMutation({
        onSuccess: () => {
            toast.success('Point created successfully ✅')
        },
        onError: () => {
            toast.error('Error creating point ❌')
        },
        onSettled: async () => {
            if (type === 'testing') await trpc.point.testings.invalidate(taskId)
            if (type === 'review') await trpc.point.reviews.invalidate(taskId)
        }
    });
    const { mutate: deleteMutation } = api.point.delete.useMutation({
        onSuccess: () => {
            toast.success('Point deleted successfully ✅')
        },
        onError: () => {
            toast.error('Error deleting point ❌')
        },
        onSettled: async () => {
            if (type === 'testing') await trpc.point.testings.invalidate(taskId)
            if (type === 'review') await trpc.point.reviews.invalidate(taskId)
        }
    });

    if (isSprintLoading) return <option>Loading sprint 🔄</option>
    if (isSprintError) return <option>Error fetching sprint ❌</option>
    if (isProfileLoading) return <option>Loading profile 🔄</option>
    if (isProfileError) return <option>Error fetching profile ❌</option>

    return (
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select value={profileId ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, taskId, profileId: e.target.value, type });
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
                <select value={point ?? ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                        updateMutation({ id, taskId, profileId: profileId || '', type, point: parseFloat(e.target.value) });
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
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!last) {
                        deleteMutation(id);
                    } else {
                        createMutation({ taskId, type });
                    }
                }}>
                    {!last ? <button type="submit" className="bg-red-600 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1" style={{ transition: "all .15s ease" }}>
                        <i className="fas fa-trash-alt"></i>
                    </button> : <button type="submit" className="bg-blueGray-700 text-white active:bg-blueGray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1" style={{ transition: "all .15s ease" }}>
                        <i className="fas fa-add"></i>
                    </button>
                    }
                </form>
            </td>
        </tr >
    )
}
