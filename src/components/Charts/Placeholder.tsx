import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export function Placeholder() {
    return (
        <Line
            data={{
                labels: [
                    "Sprint 20",
                    "Sprint 21",
                    "Sprint 22",
                    "Sprint 23",
                ],
                datasets: [
                    {
                        data: [130.5, 135.75, 136.75, 140],
                        backgroundColor: "purple",
                    },
                ],
            }}
        />
    );
}
