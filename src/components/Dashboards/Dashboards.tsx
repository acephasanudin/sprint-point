import { Themes } from "../Navigations/Themes";
import { SummaryPoints } from "./SummaryPoints";
import { TableSummaryPoints } from "./TableSummaryPoints";
import { VelocityTotalPoints } from "./VelocityTotalPoints";
import { CompletedTotalPoints } from "./CompletedTotalPoints";

export function Dashboards() {
    // get sprints
    // Get
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                </div >
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">Dashboard</a>
                </div>
                <Themes />
            </div >
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <SummaryPoints />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">Table Summary Points</div>
                    <TableSummaryPoints />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">Velocity Total Point</div>
                    <VelocityTotalPoints />
                </div>
            </div>
            <div className="container mx-auto pb-16">
                <div className="overflow-x-auto">
                    <div className="divider divider-primary">Completed Total Point</div>
                    <CompletedTotalPoints />
                </div>
            </div>
        </>
    );
}



// <div className="container mx-auto pb-16">
//     <div className="overflow-x-auto">
//         <div className="card-actions justify-end">
//             <select className="select select-primary">
//                 <option>Current Sprint</option>
//                 <option>Sprint 21</option>
//                 <option>Sprint 22</option>
//             </select>
//         </div>
//         <SummaryPoints />
//         <div className="divider divider-primary"></div>
//         <div className="collapse collapse-arrow">
//             <input type="checkbox" />
//             <div className="collapse-title text-xl font-medium">
//                 Burndown chart
//             </div>
//             <div className="collapse-content">
//                 <Placeholder />&nbsp;
//             </div>
//         </div>
//     </div>
// </div>
