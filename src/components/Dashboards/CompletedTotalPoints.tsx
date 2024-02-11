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

export function CompletedTotalPoints(data: any) {
    const { profiles, sprints } = data.data;
    useEffect(() => {
        const ctx = document.getElementById('completedTotalPoints') as HTMLCanvasElement;
        const completedTotalPoints = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    "Yudha",
                    "Tono",
                    "Dian",
                    "James",
                    "Izzur",
                    "Acep",
                    "Isti",
                    "Farel",
                    "Bimo",
                    "Abdi",
                    "Samuel",
                    "Ahmad",
                    "Farhan",
                    "Reymond",
                    "Escher",
                    "Ronny",
                    "Nanang",
                    "Syahrul",
                    "Bustomi",
                    "Agus",
                    "Andres",
                    "Diko",
                    "Agung",
                    "Marsino",
                    "Ari",
                    "Andre",
                    "Frizar",
                    "Arya"
                ],
                datasets: [
                    {
                        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                        label: "Estimated",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                    }
                ]
            },
        });

        return () => {
            completedTotalPoints.destroy();
        };
    }, []);

    return (
        <canvas id='completedTotalPoints'></canvas>
    );
}
