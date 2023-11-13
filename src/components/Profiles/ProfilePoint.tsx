import type { ProfileProps } from "../../types";

function calcPoint(points: any, sprintId: any) {
    const validPoints = points.filter((point: any) => {
        return ['review', 'review done', 'waiting for testing', 'in testing', 'accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        sprintId ? b['type'] === 'point' && b['sprintId'] === sprintId ? b['point'] || 0 : 0 : b['type'] === 'point' ? b['point'] || 0 : 0
    ), 0)
}

function calcReview(points: any, sprintId: any) {
    const validPoints = points.filter((point: any) => {
        return ['review done', 'waiting for testing', 'in testing', 'accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        sprintId ? b['type'] === 'review' && b['sprintId'] === sprintId ? b['point'] || 0 : 0 : b['type'] === 'review' ? b['point'] || 0 : 0
    ), 0)
}

function calcTesting(points: any, sprintId: any) {
    const validPoints = points.filter((point: any) => {
        return ['accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        sprintId ? b['type'] === 'testing' && b['sprintId'] === sprintId ? b['point'] || 0 : 0 : b['type'] === 'testing' ? b['point'] || 0 : 0
    ), 0)
}

export function ProfilePoint({ sprintId, profile }: ProfileProps) {
    const { username, color, avatar, points } = profile
    const point = calcPoint(points, sprintId)
    const review = calcReview(points, sprintId)
    const testing = calcTesting(points, sprintId)
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
