import { BottomNav } from "../../components/Navigations/BottomNav";
import { Dashboards } from "~/components/Dashboards/Dashboards";

export default function Dashboard() {
    return (
        <main>
            <Dashboards />
            <BottomNav />
        </main>
    );
}
