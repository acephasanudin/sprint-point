import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { TablePoint } from "./TablePoint";

export function TablePoints({ type }: any) {
    const taskId = useRouter().query.slug as string;
    const { data: points, isLoading, isError } = api.point.all.useQuery({ taskId, type });

    if (isLoading) return <div className="skeleton w-full h-32"></div>
    if (isError) return <p>Error :(</p>

    return (
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th>PIC</th>
                    <th>Sprint</th>
                    <th>Point</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {points.length ?
                    points.map((point: any, i: number) => {
                        if (points.length === i + 1) {
                            return <TablePoint type={type} taskId={taskId} key={point.id} point={point} btnAdd={true} />
                        }
                        return <TablePoint type={type} taskId={taskId} key={point.id} point={point} />
                    })
                    : <TablePoint type={type} taskId={taskId} btnAdd={true} />}
            </tbody>
        </table>
    );
}
