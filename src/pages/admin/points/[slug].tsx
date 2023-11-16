import { BottomNav } from "../../../components/Navigations/BottomNav";
import { TopNav } from "../../../components/Navigations/TopNav";
import { TablePoints } from "../../../components/Points/TablePoints";
import { CardTask } from "../../../components/Tasks/CardTask";

export default function Points() {
    return (
        <main >
            <TopNav />
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <CardTask />
                    <div className="divider divider-primary">Points</div>
                    <TablePoints type="point" />
                    <div className="divider divider-secondary">Reviews</div>
                    <TablePoints type="review" />
                    <div className="divider divider-accent">Testings</div>
                    <TablePoints type="testing" />
                </div>
            </div>
            <BottomNav />
        </main>
    );
}
