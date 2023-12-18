"use client";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
ChartJS.register();

export function EstimatedActualPoint() {
    return (
        <Line
            data={{
                labels: [
                    "Sprint 20",
                    "Sprint 21",
                    "Sprint 22",
                ],
                datasets: [
                    {
                        label: 'Estimated',
                        data: [130.5, 135.75, 136.75],
                        backgroundColor: "orange",
                    },
                    {
                        label: 'Completed',
                        data: [129.5, 132.75, 135.75],
                        backgroundColor: "green",
                    },
                ],
            }}
        />
    );
}
