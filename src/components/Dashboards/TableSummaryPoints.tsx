import { TableSummaryPoint } from "./TableSummaryPoint"

export function TableSummaryPoints(data: any) {
    const { profiles } = data
    return (
        <div className="shadow w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>P/R/T</th>
                            <th>E/A</th>
                            <th>Average Point</th>
                            <th>Total Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.length ?
                            profiles.map((profile: any) => {
                                return <TableSummaryPoint key={profile.id} profile={profile} />
                            })
                            : <tr>
                                <td colSpan={5} className="text-center">No profile</td></tr>}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>P/R/T</th>
                            <th>E/A</th>
                            <th>Average Point</th>
                            <th>Total Point</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    )
}
