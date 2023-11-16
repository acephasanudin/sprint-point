import Link from "next/link";


function calculate(points: any, type: string) {
    return points.filter((p: any) => p.type === type).reduce((a: any, b: any) => a + b.point, 0);
}

export function TableTask({ task }: any) {
    const { points } = task;
    const point = calculate(points, "point");
    const review = calculate(points, "review");
    const testing = calculate(points, "testing");
    return (
        <tr>
            <td>
                <div className="tooltip tooltip-primary" data-tip="to clickup app">
                    <a href={`https://app.clickup.com/t/${task.id}`} target="_blank" rel="noreferrer">
                        {task.id}
                    </a>
                </div>
            </td>
            <td>
                <div className="tooltip tooltip-primary" data-tip="detail">
                    <Link href={`/admin/points/${task.id}`}>
                        {task.name.substring(0, 50)}...
                    </Link>
                </div>
            </td>
            <td>
                <div className="tooltip tooltip-primary" data-tip="detail">
                    <Link href={`/admin/points/${task.id}`}>
                        {point}/{review}/{testing}
                    </Link>
                </div>
            </td>
        </tr >
    );
}
