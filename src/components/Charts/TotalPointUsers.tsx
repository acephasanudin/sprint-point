import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
ChartJS.register();


export function TotalPointUsers() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const labels = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Completed',
                data: labels.map(() => 4),
                backgroundColor: 'orange',
            },
            {
                label: 'Estimated',
                data: labels.map(() => 5),
                backgroundColor: 'green',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
