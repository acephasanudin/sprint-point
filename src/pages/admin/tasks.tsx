import { BottomNav } from "../../components/Navigations/BottomNav";
import { TableTasks } from "../../components/Tasks/TableTasks";

export default function Tasks() {
    return (
        <main >
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <TableTasks />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
