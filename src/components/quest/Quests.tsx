import { api } from "../../utils/api";
import { Quest } from "./Quest";


export function Quests() {
	const { data: quests, isLoading, isError } = api.quest.all.useQuery();

	if (isLoading) return <div>Loading quests 🔄</div>
	if (isError) return <div>Error fetching quests ❌</div>

	return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Task</th>
                    <th>Point</th>
                    <th>Review</th>
                    <th>Testing</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
			{quests.length ?
				quests.map((quest) => {
					return <Quest key={quest.id} quest={quest} />
				})
				: "Create your first quest..."}
            </tbody>
        </table>
	)
}
