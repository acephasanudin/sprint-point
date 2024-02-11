import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

function calculateProfileTotal(points: any, status: string): Map<string, number> {
    let totalPointsMap = new Map<string, number>();
    points.forEach((point: any) => {
        if (point.status === status) {
            const sprintId = point.sprintId;

            if (totalPointsMap.has(sprintId)) {
                totalPointsMap.set(sprintId, totalPointsMap.get(sprintId)! + point.point);
            } else {
                totalPointsMap.set(sprintId, point.point);
            }
        }
    });
    return totalPointsMap;
}

type TotalPointsMap = {
    labels: string[];
    estimated: number[];
    completed: number[];
};

function calculatePoint(profiles: any): any {
    let totalPointsMap: TotalPointsMap = {
        labels: [],
        estimated: [],
        completed: []
    };

    profiles?.forEach((profile: any) => {
        const estimated = calculateProfileTotal(profile.points, "planning");
        const completed = calculateProfileTotal(profile.points, "actual");
        estimated.forEach((point, sprintId) => {
            const index = totalPointsMap.labels.indexOf(sprintId);

            if (index !== -1) {
                totalPointsMap.estimated[index] += point;
            } else {
                totalPointsMap.labels.push(sprintId);
                totalPointsMap.estimated.push(point);
            }
        });
        completed.forEach((point, sprintId) => {
            const index = totalPointsMap.labels.indexOf(sprintId);
            if (index !== -1) {
                if (totalPointsMap.completed[index]) {
                    totalPointsMap.completed[index] += point;
                } else {
                    totalPointsMap.completed.push(point);
                }
            } else {
                totalPointsMap.labels.push(sprintId);
                totalPointsMap.completed.push(point);
            }
        });
    });

    return totalPointsMap;
}

function replaceIdsWithNames(ids: string[], sprintData: Sprint[]): string[] {
    const idToNameMap: { [id: string]: string } = {};

    sprintData?.forEach((sprint) => {
        idToNameMap[sprint.id] = sprint.name;
    });

    const replacedNames: string[] = ids.map((id) => idToNameMap[id] || id);

    return replacedNames;
}


export function VelocityTotalPoints(data: any) {
    const { profiles, sprints } = data.data;
    const points = calculatePoint(profiles)
    const labels = replaceIdsWithNames(points?.labels, sprints);
    console.log(labels);
    useEffect(() => {
        const ctx = document.getElementById('velocityTotalPoints') as HTMLCanvasElement;
        const velocityTotalPoints = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        data: points?.estimated,
                        label: "Estimated",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                    },
                    {
                        data: points?.completed,
                        label: "Completed",
                        borderColor: "#c45850",
                        backgroundColor: "#FF7F50",
                    }
                ]
            },
        });

        return () => {
            velocityTotalPoints.destroy();
        };
    }, [sprints]);

    return (
        <canvas id='velocityTotalPoints'></canvas>
    );
}
