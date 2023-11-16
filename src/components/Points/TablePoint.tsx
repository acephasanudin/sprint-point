import { api } from "../../utils/api";
import { useState } from "react";

export function TablePoint({ taskId, type, point, btnAdd }: any) {
    const [profileId, setProfileId] = useState<string | undefined>();
    const [sprintId, setSprintId] = useState<string | undefined>();
    const [pointValue, setPointValue] = useState<number | undefined>();

    const { data: profiles } = api.profile.all.useQuery();
    const { data: sprints } = api.sprint.all.useQuery();

    const trpc = api.useContext();

    const { mutate: createMutation } = api.point.create.useMutation({
        onMutate: async (data: any) => {
            await trpc.point.all.cancel()
            trpc.point.all.setData({ type, taskId }, (prev: any) => {
                const newPoint = {
                    id: Math.random().toString(36).substring(2, 9),
                    profileId: data.profileId ?? profileId,
                    sprintId: data.sprintId ?? sprintId,
                    point: data.point ?? pointValue,
                    type,
                    taskId,
                };
                return [...(prev ?? []), newPoint];
            })
        },
        onSuccess: () => {
        },
        onError: () => {
        },
        onSettled: async () => {
            await trpc.point.all.invalidate();
        },
    });

    const { mutate: deleteMutation } = api.point.delete.useMutation({
        onMutate: async () => {
            await trpc.point.all.cancel()
            trpc.point.all.setData({ type, taskId }, (prev) => {
                return prev?.filter((p) => p.id !== point?.id)
            })
        },
        onSuccess: () => {
        },
        onError: () => {
        },
        onSettled: async () => {
            await trpc.point.all.invalidate();
        },
    });

    const { mutate: updateMutation } = api.point.update.useMutation({
        onMutate: (data: any) => {
            setProfileId(data.profileId ?? profileId);
            setSprintId(data.sprintId ?? sprintId);
            setPointValue(data.point ?? pointValue);
        },
        onSuccess: () => {
        },
        onError: () => {
        },
        onSettled: async () => {
            await trpc.point.all.invalidate();
        },
    });

    return (
        <tr>
            <td>
                <select value={profileId ?? point?.profileId} className="select select-primary w-full max-w-xs"
                    onChange={(e) => {
                        updateMutation({ id: point?.id, profileId: e.target.value, taskId, type });
                    }}
                >
                    <option disabled selected>Who is the PIC?</option>
                    <option value=""></option>
                    {profiles?.length ?
                        profiles.map((profile: any) => {
                            return <option key={profile.id} value={profile.id}>{profile.username}</option>
                        })
                        : <option>No profiles</option>}
                </select>
            </td>
            <td>
                <select value={sprintId ?? point?.sprintId} className="select select-primary w-full max-w-xs"
                    onChange={(e) => {
                        updateMutation({ id: point?.id, sprintId: e.target.value, taskId, type });
                    }}
                >
                    <option disabled selected>Which sprint?</option>
                    <option value=""></option>
                    {sprints?.length ?
                        sprints.map((sprint: any) => {
                            return <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                        })
                        : <option>No sprint</option>}
                </select>
            </td>
            <td>
                <select value={pointValue ?? point?.point} className="select select-primary w-full max-w-xs"
                    onChange={(e) => {
                        updateMutation({ id: point?.id, point: parseFloat(e.target.value), taskId, type });
                    }}
                >
                    <option disabled selected>How many point?</option>
                    <option value="0">0</option>
                    <option value="0.25">0.25</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                </select>
            </td>
            <td>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!btnAdd) {
                        deleteMutation(point?.id);
                    } else {
                        createMutation({ taskId, type });
                    }
                }}>
                    {!btnAdd ?
                        <button className="btn btn-circle btn-outline btn-error">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> :
                        <button className="btn btn-circle btn-outline btn-success">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>}
                </form>
            </td>
        </tr>
    );
}