function calculate(points: any, type: string) {
    return points.filter((p: any) => p.type === type).reduce((a: any, b: any) => a + b.point, 0);
}

export function TableProfile({ profile }: any) {
    const { points } = profile;
    const point = calculate(points, "point");
    const review = calculate(points, "review");
    const testing = calculate(points, "testing");
    return (
        <tr>
            <td>
                {profile.username}
            </td>
            <td>
                {point}/{review}/{testing}
            </td>
            <td>
                {point + review + testing}
            </td>
        </tr >
    );
}
