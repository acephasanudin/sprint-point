import { BottomNav } from "../../components/Navigations/BottomNav";
import { TableTasks } from "../../components/Tasks/TableTasks";

export default function Tasks() {
    return (
        <main >
            <div className="container mx-auto pb-16">
                <TableTasks />
            </div>
            <BottomNav />
        </main>
    );
}
