import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
ChartJS.register();

export function BurndownChart() {
    return (
        <Line
            data={{
                labels: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30"
                ],
                datasets: [
                    {
                        label: 'Estimated',
                        data: [150, 147, 144, 141, 138, 135, 132, 129, 126, 123, 120, 117, 114, 111, 108, 105, 102, 99, 96, 93, 90, 87, 84, 81, 78, 75, 72, 69, 66, 63],
                        backgroundColor: "orange",
                    },
                    {
                        label: 'Completed',
                        data: [148, 146, 144, 142, 140, 138, 136, 134, 132, 130, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90],
                        backgroundColor: "green",
                    },
                ],
            }}
        />
    );
}
