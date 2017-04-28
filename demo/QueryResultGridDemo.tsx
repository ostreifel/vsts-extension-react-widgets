import * as React from "react";

import {QueryResultGrid} from "../src/Components/WorkItemGrid/QueryResultGrid";
import { SelectionMode } from "OfficeFabric/utilities/selection/interfaces";

interface IQueryResultGridDemoState {

}

export class QueryResultGridDemo extends React.Component<void, IQueryResultGridDemoState> {
    constructor(props: void, context?: any) {
        super(props, context);

        this.state = {
        } as IQueryResultGridDemoState;
    }

    public render(): JSX.Element {
        return <QueryResultGrid 
                project={VSS.getWebContext().project.id}
                wiql="select [System.Id], [System.WorkItemType], [System.Title], [System.AssignedTo], [System.State], [System.Tags] from Workitems where [System.TeamProject] = @project and [System.WorkItemType] <> '' and [System.State] <> ''" 
                selectionMode={SelectionMode.multiple}
                columnsProps={{
                    extraColumns: [{
                        key:"demo",
                        name:"demo",
                        renderer: () => <div>Hello</div>
                    }]
                }}
                />;
    }
}