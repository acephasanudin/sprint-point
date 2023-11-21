import { BottomNav } from "../../components/Navigations/BottomNav";
import { TopNav } from "../../components/Navigations/TopNav";
import { Placeholder } from "../../components/Charts/Placeholder";

export default function Dashboard() {
    return (
        <main >
            <TopNav />
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="stats shadow w-full">
                        <div className="stat place-items-center">
                            <div className="stat-title">Avg. Total Points</div>
                            <div className="stat-value">4.86</div>
                            <div className="stat-desc">+4.02% from last sprint</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Avg. Sprint Points</div>
                            <div className="stat-value text-secondary">3.85</div>
                            <div className="stat-desc text-secondary">+4.54% from last sprint</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Avg. Review Points</div>
                            <div className="stat-value">1.5</div>
                            <div className="stat-desc">-33.65% from last sprint</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Avg. Testing Points</div>
                            <div className="stat-value">3.05</div>
                            <div className="stat-desc">+10.91% from last sprint</div>
                        </div>
                    </div>
                    <Placeholder />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
