import { BottomNav } from "../../components/Navigations/BottomNav";
import { TopNav } from "../../components/Navigations/TopNav";
import { TableTasks } from "../../components/Tasks/TableTasks";

export default function Tasks() {
    return (
        <main >
            <TopNav />
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <TableTasks />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
