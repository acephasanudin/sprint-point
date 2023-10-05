import { useState } from "react"
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { SearchTask } from "../../types";

export function SearchPoint() {
    const [id, setId] = useState("")
    const [type, setType] = useState("")

    const trpc = api.useContext();

    const { mutate } = api.task.setListId.useMutation({
        onMutate: async () => {
            setId('')
            await trpc.task.all.invalidate()
            await trpc.task.all.refetch()
        },
        onError: (newTask: any, context: any) => {
            toast.error("An error occured when creating task")
            setId(newTask)
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
                const result = SearchTask.safeParse({ id, type })

                if (!result.success) {
                    toast.error(result.error.format()._errors.join('\n'))
                    return
                }

                mutate({ id, type })
            }} className="flex gap-2">
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
