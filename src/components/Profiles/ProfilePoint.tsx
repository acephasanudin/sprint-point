import type { ProfileProps } from "../../types";

export function ProfilePoint({ profile }: ProfileProps) {
    const { id, username, color, avatar, tasks, points } = profile
    const point = tasks.reduce((a: any, b: any) => a + (b['point'] || 0), 0)
    const review = points.reduce((a: any, b: any) => a + (b['type'] === 'review' ? b['point'] || 0 : 0), 0)
    const testing = points.reduce((a: any, b: any) => a + (b['type'] === 'testing' ? b['point'] || 0 : 0), 0)

    return (
        <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <img
                    src={avatar || "/img/no-avatar.png"}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                ></img>{" "}
                <span
                    className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                >
                    {username}
                </span>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                0
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span className="mr-2">
                    {point}
                </span>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span className="mr-2">
                    {review}
                </span>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                    {testing}
                </div>
            </td>
        </tr>
    )
}
