function calculate(points: any, type: string) {
    return points.filter((p: any) => p.type === type).reduce((a: any, b: any) => a + b.point, 0);
}

function calcPoint(points: any) {
    const validPoints = points.filter((point: any) => {
        return ['in review', 'review done', 'waiting for testing', 'in testing', 'accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        b['type'] === 'point' ? b['point'] || 0 : 0
    ), 0)
}

function calcReview(points: any) {
    const validPoints = points.filter((point: any) => {
        return ['review done', 'waiting for testing', 'in testing', 'accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        b['type'] === 'in review' ? b['point'] || 0 : 0
    ), 0)
}

function calcTesting(points: any) {
    const validPoints = points.filter((point: any) => {
        return ['accepted', 'ready to deploy', 'completed', 'Closed'].includes(point['task']['status'])
    })
    return validPoints.reduce((a: any, b: any) => a + (
        b['type'] === 'testing' ? b['point'] || 0 : 0
    ), 0)
}

export function TableProfile({ profile }: any) {
    const { points } = profile;
    const point = calculate(points, "point");
    const review = calculate(points, "review");
    const testing = calculate(points, "testing");

    const cPoint = calcPoint(points);
    const cReview = calcReview(points);
    const cTesting = calcTesting(points);
    return (
        <tr>
            <td>
                {profile.username}
            </td>
            <td>
                <div className="tooltip tooltip-primary" data-tip="Estimated">
                    {point} / {review} / {testing}
                </div>
                <br />
                <div className="tooltip tooltip-secondary" data-tip="Completed">
                    {cPoint} / {cReview} / {cTesting}
                </div>
            </td>
            <td>
                <div className="tooltip tooltip-primary" data-tip="Estimated">
                    {point + review + testing}
                </div>
                <br />
                <div className="tooltip tooltip-secondary" data-tip="Completed">
                    {cPoint + cReview + cTesting}
                </div>
            </td>
        </tr >
    );
}
