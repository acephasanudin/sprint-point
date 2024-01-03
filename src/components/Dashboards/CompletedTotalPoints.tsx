import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

export function CompletedTotalPoints() {
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
