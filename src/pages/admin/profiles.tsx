import { BottomNav } from "../../components/Navigations/BottomNav";
import { TopNav } from "../../components/Navigations/TopNav";
import { TableProfiles } from "../../components/Profiles/TableProfiles";

export default function Profiles() {
    return (
        <main >
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <TableProfiles />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
