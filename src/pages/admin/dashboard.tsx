import { BottomNav } from "../../components/Navigations/BottomNav";
import { EstimatedActualPoint } from "~/components/Charts/EstimatedActualPoint";
import { SummaryPoints } from "~/components/Charts/SummaryPoints";
import { TotalPointTeams } from "~/components/Charts/TotalPointTeams";
import { BurndownChart } from "~/components/Charts/BurndownChart";
import { TotalPointUsers } from "~/components/Charts/TotalPointUsers";

export default function Dashboard() {
    return (
        <main>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="card-actions justify-end">
                        <select className="select select-primary">
                            <option>Current Sprint</option>
                            <option>Sprint 21</option>
                            <option>Sprint 22</option>
                        </select>
                    </div>
                    <SummaryPoints />
                    <div className="divider divider-primary"></div>
                    <div className="collapse collapse-arrow">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Burndown chart
                        </div>
                        <div className="collapse-content">
                            <BurndownChart />&nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
