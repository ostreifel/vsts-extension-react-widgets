import * as React from "react";
import * as ReactDOM from "react-dom";

import {Pivot, PivotItem} from "OfficeFabric/Pivot";
import {CommonComponentsDemo} from "./CommonComponentsDemo";
import {QueryResultGridDemo} from "./QueryResultGridDemo";

export class Demo extends React.Component<{}, {}> {

    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        };
    }

    public render(): JSX.Element {
        return (
            <Pivot>
            <PivotItem linkText='Common'>
                <CommonComponentsDemo />
            </PivotItem>
            <PivotItem linkText='Work item grid'>
                <QueryResultGridDemo />
            </PivotItem>
            </Pivot>
        );
    }
}

export function init() {
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}