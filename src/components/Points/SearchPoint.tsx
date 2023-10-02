import { useState } from "react"
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { TaskInput } from "../../types";
import type { Task } from "../../types";

export function SearchPoint() {
    const [newTask, setNewTask] = useState("")

    const trpc = api.useContext();

    const { mutate } = api.task.create.useMutation({
        onMutate: async (newTask) => {

            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await trpc.task.all.cancel()

            // Snapshot the previous value
            const previousTasks = trpc.task.all.getData()

            // @ts-ignore-next-line
            trpc.task.all.setData(undefined, (prev: any) => {
                const optimisticTask: Task = {
                    id: '',
                    name: '',
                    point: null,
                    review: null,
                    testing: null,
                    sprint: '',
                    status: '',
                }
                if (!prev) return [optimisticTask]
                // @ts-ignore-next-line
                return [...prev, optimisticTask]
            })

            // Clear input
            setNewTask('')

            // Return a context object with the snapshotted value
            return { previousTasks }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTask, context) => {
            toast.error("An error occured when creating task")
            // Clear input
            setNewTask(newTask)
            if (!context) return
            trpc.task.all.setData(undefined, () => context.previousTasks)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            console.log('SETTLED')
            await trpc.task.all.invalidate()
        },
    });

    return (
        <div className="float-right">
            <form onSubmit={(e) => {
                e.preventDefault()
                const result = TaskInput.safeParse(newTask)

                if (!result.success) {
                    toast.error(result.error.format()._errors.join('\n'))
                    return
                }

                mutate(newTask)
            }} className="flex gap-2">
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="List id..."
                    type="text" name="new-task" id="new-task"
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value)
                    }}
                />
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 w-full sm:w-auto px-5 py-2.5 text-center hover:border-transparent rounded ml-3"
                >
                    Find Tasks
                </button>
            </form>
        </div>
    )
}
