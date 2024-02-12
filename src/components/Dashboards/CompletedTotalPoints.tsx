import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

function calculateProfileTotal(username: string, points: any, status: string): Map<string, number> {
    let totalPointsMap = new Map<string, number>();
    points.forEach((point: any) => {
        if (point.status === status) {
            if (totalPointsMap.has(username)) {
                totalPointsMap.set(username, totalPointsMap.get(username)! + point.point);
            } else {
                totalPointsMap.set(username, point.point);
            }
        }
    });
    return totalPointsMap;
}

type TotalPointsMap = {
    labels: string[];
    sprints: string[];
    estimated: number[];
    completed: number[];
};

function calculatePoint(profiles: any): any {
    let totalPointsMap: TotalPointsMap = {
        labels: [],
        sprints: [],
        estimated: [],
        completed: []
    };

    profiles?.forEach((profile: any) => {
        const estimated = calculateProfileTotal(profile.username, profile.points, "planning");
        const completed = calculateProfileTotal(profile.username, profile.points, "actual");
        estimated.forEach((point, username) => {
            const index = totalPointsMap.labels.indexOf(username);
            if (index !== -1) {
                if (totalPointsMap.estimated[index]) {
                    totalPointsMap.estimated[index] += point;
                } else {
                    totalPointsMap.estimated[index] += point;
                }
            } else {
                totalPointsMap.labels.push(username);
                totalPointsMap.estimated.push(point);
            }
        });
        completed.forEach((point, username) => {
            const index = totalPointsMap.labels.indexOf(username);
            if (index !== -1) {
                if (totalPointsMap.completed[index]) {
                    totalPointsMap.completed[index] += point;
                } else {
                    totalPointsMap.completed.push(point);
                }
            } else {
                totalPointsMap.labels.push(username);
                totalPointsMap.completed.push(point);
            }
        });
    });

    return totalPointsMap;
}

export function CompletedTotalPoints(data: any) {
    const { profiles, sprints } = data.data;
    const points = calculatePoint(profiles)
    console.log(points);
    useEffect(() => {
        const ctx = document.getElementById('completedTotalPoints') as HTMLCanvasElement;
        const completedTotalPoints = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: points.labels,
                datasets: [
                    {
                        data: points.estimated,
                        label: "Estimated",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                    },
                    {
                        data: points.completed,
                        label: "Completed",
                        borderColor: "#c45850",
                        backgroundColor: "#FF7F50",
                    }
                ]
            },
        });

        return () => {
            completedTotalPoints.destroy();
        };
    }, [sprints]);

    return (
        <canvas id='completedTotalPoints'></canvas>
    );
}
