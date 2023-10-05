import type { ProfileProps } from "../../types";

export function Profile({ profile }: ProfileProps) {
    const { id, username, color, initials, avatar, email, teamId } = profile

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
                {email}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span className="mr-2">10</span>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span className="mr-2">100%</span>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div
                                style={{ width: "60%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                            ></div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
