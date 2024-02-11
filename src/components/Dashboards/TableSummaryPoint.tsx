function calculate(points: any, type: string, status: string): number {
    return points.filter((p: any) => p.type === type && p.status === status).reduce((a: any, b: any) => a + b.point, 0);
}

function calculateAverage(points: any): number {
    const groupedPoints: Record<string, { sum: number; count: number }> = {};

    points.forEach((p: any) => {
        if (p.status !== "actual") return;
        const { sprintId, point } = p;

        if (!groupedPoints[sprintId]) {
            groupedPoints[sprintId] = { sum: 0, count: 0 };
        }

        groupedPoints[sprintId]!.sum += point;
        groupedPoints[sprintId]!.count += 1;
    });


    let totalSum = 0;
    let totalCount = 0;

    Object.values(groupedPoints).forEach((group) => {
        totalSum += group.sum;
        totalCount += 1;
    });

    // Calculate the average of averages
    const averageOfAverages = totalCount > 0 ? totalSum / totalCount : 0;

    return averageOfAverages;
}

function totalPoint(points: any): number {
    return points.filter((p: any) => p.status === "actual").reduce((a: any, b: any) => a + b.point, 0);
}

export function TableSummaryPoint({ profile }: any) {
    const { points } = profile;
    const planPoint = calculate(points, "point", "planning");
    const planReview = calculate(points, "review", "planning");
    const planTesting = calculate(points, "testing", "planning");

    const actualPoint = calculate(points, "point", "actual");
    const actualReview = calculate(points, "review", "actual");
    const actualTesting = calculate(points, "testing", "actual");

    const avg = calculateAverage(points);
    const total = totalPoint(points);

    return (
        <tr>
            <td>
                {profile.username}
            </td>
            <td>
                {actualPoint} / {actualReview} / {actualTesting}
            </td>
            <td>
                {planPoint + planReview + planTesting} / {actualPoint + actualReview + actualTesting}
            </td>
            <td>
                {avg}
            </td>
            <td>
                {total}
            </td>
        </tr >
    );
}
