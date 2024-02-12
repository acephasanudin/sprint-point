import { TableSummaryPoint } from "./TableSummaryPoint"

export function TableSummaryPoints(props: any) {
    const { profiles } = props.data;
    let filteredProfiles = profiles;
    if (props.filter && props.filter !== "") {
        filteredProfiles = profiles?.map((profile: any) => ({
            ...profile,
            points: profile.points.filter((point: any) => point.sprintId === props.filter),
        }));
    }
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
                        {filteredProfiles?.length ?
                            filteredProfiles.map((profile: any) => {
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
