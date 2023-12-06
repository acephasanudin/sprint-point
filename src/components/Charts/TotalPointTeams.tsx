import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
ChartJS.register();

export function TotalPointTeams() {
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
    const labels = ['Android', 'IOS', 'Web', 'QA', 'UI/UX', 'MSAP, PG, Support', 'Backend'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Completed',
                data: labels.map(() => 90),
                backgroundColor: 'orange',
            },
            {
                label: 'Estimated',
                data: labels.map(() => 100),
                backgroundColor: 'green',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
