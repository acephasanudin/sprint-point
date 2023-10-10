import type { SprintProps } from "../../types";

export function Sprint({ sprint }: SprintProps) {
    const { name } = sprint
    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
            {name}
            </th>
        </tr>
    )
}
