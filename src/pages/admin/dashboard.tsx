import { BottomNav } from "../../components/Navigations/BottomNav";
import { TopNav } from "../../components/Navigations/TopNav";

export default function Dashboard() {
    return (
        <main >
            <TopNav />
            <div className="container mx-auto">
                <div className="overflow-x-auto">
                    Dashboard
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
