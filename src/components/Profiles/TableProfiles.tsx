import { TableProfile } from "./TableProfile";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

export function TableProfiles() {
    const { data: profiles, isLoading, isError } = api.profile.all.useQuery();

    if (isLoading) return <div className="skeleton w-full h-32"></div>
    if (isError) return <p>Error :(</p>

    return (
        <table className="table table-zebra">
            {/* head */}
            <thead>
                <tr>
                    <th>Name</th>
                    <th>
                        <div className="tooltip tooltip-primary tooltip-left" data-tip="Point/Review/Testing">
                            P/R/T
                        </div>
                    </th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {profiles.length ?
                    profiles.map((profile: any) => {
                        return <TableProfile key={profile.id} profile={profile} />
                    })
                    : <tr>
                        <td colSpan={4} className="text-center">No profile</td></tr>}
            </tbody>
        </table>
    );
}
