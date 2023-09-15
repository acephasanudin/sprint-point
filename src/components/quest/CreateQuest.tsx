
import { useState } from "react"
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { questInput } from "../../types";
import type { Quest } from "../../types";

export function CreateQuest() {
	const [newQuest, setNewQuest] = useState("")

	const trpc = api.useContext();

	const { mutate } = api.quest.create.useMutation({
		onMutate: async (newQuest) => {

			// Cancel any outgoing refetches so they don't overwrite our optimistic update
			await trpc.quest.all.cancel()

			// Snapshot the previous value
			const previousQuests = trpc.quest.all.getData()

			// Optimistically update to the new value
			trpc.quest.all.setData(undefined, (prev) => {
				const optimisticQuest: Quest = {
					id: 'optimistic-quest-id',
					text: newQuest, // 'placeholder'
					done: false
				}
				if (!prev) return [optimisticQuest]
				return [...prev, optimisticQuest]
			})

			// Clear input
			setNewQuest('')

			// Return a context object with the snapshotted value
			return { previousQuests }
		},
		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, newQuest, context) => {
			toast.error("An error occured when creating quest")
			// Clear input
			setNewQuest(newQuest)
			if (!context) return
			trpc.quest.all.setData(undefined, () => context.previousQuests)
		},
		// Always refetch after error or success:
		onSettled: async () => {
			console.log('SETTLED')
			await trpc.quest.all.invalidate()
		},
	});

	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault()
				const result = questInput.safeParse(newQuest)

				if (!result.success) {
					toast.error(result.error.format()._errors.join('\n'))
					return
				}

				mutate(newQuest)
			}} className="flex gap-2">
				<input
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="New Quest..."
					type="text" name="new-quest" id="new-quest"
					value={newQuest}
					onChange={(e) => {
						setNewQuest(e.target.value)
					}}
				/>
				<button
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>Create</button>
			</form>
		</div>
	)
}
