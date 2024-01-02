import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export function TablePoint({ taskId, type, point, btnAdd }: any) {
    const [active, setActive] = useState(true);
    const [profileId, setProfileId] = useState<string | undefined>();
    const [sprintId, setSprintId] = useState<string | undefined>();
    const [pointValue, setPointValue] = useState<string | undefined>();

    const { data: profiles } = api.profile.all.useQuery();
    const { data: sprints } = api.sprint.all.useQuery();

    useEffect(() => {
        if (profileId) return setActive(true);
        return setActive(false);
    }, [profileId])
    useEffect(() => {
        if (point?.profileId) return setActive(true);
        if (!sprintId) return setSprintId(() => sprints ? sprints?.[0]?.id : undefined)
    }, [])

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
        onSuccess: (data) => {
            toast(
                (t) => (
                    <span>
                        Deleted! &nbsp;
                        <button onClick={() => {
                            const pointTask = {
                                id: data?.id,
                                profileId: data?.profileId!,
                                taskId: data?.taskId!,
                                type: data?.type!,
                                point: data?.point!,
                                sprintId: data?.sprintId || sprintId
                            }
                            createMutation(pointTask);
                            toast.dismiss(t.id)
                        }}>Undo?</button>
                    </span>
                ),
                {
                    icon: '🔥',
                }
            );
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
                        if (!sprintId) setSprintId(sprints?.[0]?.id);
                        updateMutation({ id: point?.id, profileId: e.target.value, taskId, type, sprintId });
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
                <select disabled={!active} value={sprintId ?? point?.sprintId} className="select select-primary w-full max-w-xs"
                    onChange={(e) => {
                        updateMutation({ id: point?.id, sprintId: e.target.value, taskId, type });
                    }}
                >
                    {sprints?.length ?
                        sprints.map((sprint: any) => {
                            return <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                        })
                        : <option>No sprint</option>}
                </select>
            </td>
            <td>
                <input type="text" disabled={!active} min="0" step="0.1" lang="en-US" pattern="-?[0-9]+[\.]*[0-9]+" value={pointValue || point?.point} className="input input-primary w-full max-w-xs"
                    onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9\.]/g, '');
                        if (e.target.value.slice(-1) !== ".") e.target.value = parseFloat(e.target.value || '0').toString();
                        if (!e.target.value) setPointValue("0");
                        setPointValue(e.target.value);
                        if (e.target.value.slice(-1) !== ".") updateMutation({ id: point?.id, point: parseFloat(e.target.value) || 0, taskId, type });
                    }}
                />
            </td>
            <td>
                <form className="float-right pr-1 pl-1" onSubmit={(e) => {
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
                <form className="float-right pr-1 pl-1" onSubmit={(e) => {
                    e.preventDefault();
                    if (active) {
                        deleteMutation(point?.id);
                    }
                }}>
                    {active && btnAdd ?
                        <button className="btn btn-circle btn-outline btn-error">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> : ''
                    }
                </form>
            </td>
        </tr>
    );
}
