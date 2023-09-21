import toast from "react-hot-toast";
import type { Quest } from "../../types";
import { api } from "../../utils/api";

type QuestProps = {
    quest: Quest
}

type questData = {
    id: string;
    point?: number;
    review?: number;
    testing?: number;
};

export function Quest({ quest }: QuestProps) {
    const { id, name, point, review, testing, status } = quest

    const trpc = api.useContext();

    const { mutate: updateMutation } = api.quest.update.useMutation({
        onMutate: async (data: questData) => {
            await trpc.quest.all.cancel()
            const previousQuests = trpc.quest.all.getData()

            trpc.quest.all.setData(undefined, (prev: any) => {
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
            toast.error(`An error occured when updating quest`)
            if (!context) return
            trpc.quest.all.setData(undefined, () => context.previousQuests)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await trpc.quest.all.invalidate()
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
            <td>
                {id}
            </td>
            <td>
                {name}
            </td>
            <td >
                <div className="flex gap-2 items-center justify-between">
                    <select value={point?.toString()} className="w-14 border border-gray-300 rounded bg-black/80 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
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
                </div>
            </td>
            <td className="items-center">
                <select value={review?.toString()} className="w-14 border border-gray-300 rounded bg-black/80 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
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
            <td className="flex gap-2 items-center justify-between">
                <select value={testing?.toString()} className="w-14 border border-gray-300 rounded bg-black/80 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
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
            <td>
                {status}
            </td>
        </tr>
        // <td>
        //     <input className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" type="checkbox" name="done" id={id} checked={done} onChange={(e) => {
        //         doneMutation({ id, done: e.target.checked });
        //     }} />
        // </td>
        // <div
        // 	className="flex gap-2 items-center justify-between"
        // >
        // 	<div className="flex gap-2 items-center">
        // 		<input
        // 			className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        // 			type="checkbox" name="done" id={id} checked={done}
        // 			onChange={(e) => {
        // 				doneMutation({ id, done: e.target.checked });
        // 			}}
        // 		/>
        // 		<label htmlFor={id} className={`cursor-pointer ${done ? "line-through" : ""}`}>
        // 			{name}
        // 		</label>
        // 	</div>
        // 	<button
        // 		className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        // 		onClick={() => {
        // 			deleteMutation(id)
        // 		}}
        // 	>Delete</button>
        // </div>
    )
}
