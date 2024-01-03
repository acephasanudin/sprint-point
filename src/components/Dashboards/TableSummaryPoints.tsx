export function TableSummaryPoints() {
    return (
        <div className="shadow w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>P/R/T</th>
                            <th>E/C</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Acep Hasanudin</div>
                                        <div className="text-sm opacity-50">Backend</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                10/10/10
                                <br />
                                <span className="badge badge-ghost badge-sm">10/10/10</span>
                            </td>
                            <td>30/30</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>P/R/T</th>
                            <th>E/C</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    )
}
