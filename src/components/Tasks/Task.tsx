import toast from "react-hot-toast";
import type { Task, TaskProps, TaskData } from "../../types";
import { api } from "../../utils/api";


export function Task({ task }: TaskProps) {
    const { id, name, point, review, testing, status } = task

    const trpc = api.useContext();

    const { mutate: updateMutation } = api.task.update.useMutation({
        onMutate: async (data: TaskData) => {
            await trpc.task.all.cancel()
            const previousQuests = trpc.task.all.getData()

            trpc.task.all.setData(undefined, (prev: any) => {
                if (!prev) return previousQuests
                return prev.map((t: any) => {
                    if (t.id === id) {
                        return ({
                            ...t,
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

        onSuccess: (err, { }) => {
            // if (status) {
            //     toast.success("Quest completed 🎉")
            // }
        },

        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, status, context) => {
            toast.error(`An error occured when updating task`)
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousQuests)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await trpc.task.all.invalidate()
        },
    });

    // const { mutate: deleteMutation } = api.quest.delete.useMutation({
    // 	onMutate: async (deleteId) => {

    // 		// Cancel any outgoing refetches so they don't overwrite our optimistic update
    // 		await trpc.quest.all.cancel()

    // 		// Snapshot the previous value
    // 		const previousQuests = trpc.quest.all.getData()

    // 		// Optimistically update to the new value
    // 		trpc.quest.all.setData(undefined, (prev: any) => {
    // 			if (!prev) return previousQuests
    // 			return prev.filter((t: any) => t.id !== deleteId)
    // 		})

    // 		// Return a context object with the snapshotted value
    // 		return { previousQuests }
    // 	},
    // 	// If the mutation fails,
    // 	// use the context returned from onMutate to roll back
    // 	onError: (err, newQuest, context) => {
    // 		toast.error(`An error occured when deleting quest`)
    // 		if (!context) return
    // 		trpc.quest.all.setData(undefined, () => context.previousQuests)
    // 	},
    // 	// Always refetch after error or success:
    // 	onSettled: async () => {
    // 		await trpc.quest.all.invalidate()
    // 	},
    // });

    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    [{id}] {name}
            </th>
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
