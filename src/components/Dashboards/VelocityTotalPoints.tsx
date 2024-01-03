import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

export function VelocityTotalPoints() {
    useEffect(() => {
        const ctx = document.getElementById('velocityTotalPoints') as HTMLCanvasElement;
        const velocityTotalPoints = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Sprint 26", "Sprint 1"],
                datasets: [
                    {
                        data: [57.75, 141.00],
                        label: "Estimated",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                    },
                    {
                        data: [98.5, 145.30],
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
    }, []);

    return (
        <canvas id='velocityTotalPoints'></canvas>
    );
}
