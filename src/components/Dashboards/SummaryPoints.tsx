function calculateProfileTotal(points: any, type: string): Map<string, number> {
    let totalPointsMap = new Map<string, number>();
    points.forEach((point: any) => {
        if (point.status === "actual" && (type === "" || point.type === type)) {
            const sprintId = point.sprintId;

            if (totalPointsMap.has(sprintId)) {
                totalPointsMap.set(sprintId, totalPointsMap.get(sprintId)! + point.point);
            } else {
                totalPointsMap.set(sprintId, point.point);
            }
        }
    });

    return totalPointsMap;
}

function calculateAveragePoint(profiles: any, type: string): number {
    let totalOverallPoints = 0;
    let totalProfiles = 0;

    profiles?.forEach((profile: any) => {
        const profileTotalMap = calculateProfileTotal(profile.points, type);
        profileTotalMap.forEach((totalPoints) => {
            totalOverallPoints += totalPoints;
        });

        totalProfiles++;
    });

    const overallAverage = totalOverallPoints / totalProfiles;
    return overallAverage;
}

export function SummaryPoints(data: any) {
    const { profiles } = data;
    const sprintPoint = calculateAveragePoint(profiles, "point");
    const reviewPoint = calculateAveragePoint(profiles, "review");
    const testingPoint = calculateAveragePoint(profiles, "testing");
    const totalPoint = calculateAveragePoint(profiles, "")
    return (
        <div className="stats shadow w-full">
            <div className="stat place-items-center">
                <div className="stat-title">Avg. Sprint Points</div>
                <div className="stat-value text-primary">{sprintPoint.toFixed(2)}</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Avg. Review Points</div>
                <div className="stat-value text-primary">{reviewPoint.toFixed(2)}</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Avg. Testing Points</div>
                <div className="stat-value text-primary">{testingPoint.toFixed(2)}</div>
            </div>
            <div className="stat place-items-center">
                <div className="stat-title">Avg. Total Points</div>
                <div className="stat-value text-primary">{(totalPoint).toFixed(2)}</div>
            </div>
        </div>
    )
}
