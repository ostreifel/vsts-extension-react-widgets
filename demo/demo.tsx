import * as React from "react";
import * as ReactDOM from "react-dom";

import {Pivot, PivotItem} from "OfficeFabric/Pivot";
import {CommonComponentsDemo} from "./CommonComponentsDemo";
import {QueryResultGridDemo} from "./QueryResultGridDemo";

interface IDemoState {
}

export class Demo extends React.Component<void, IDemoState> {

    constructor(props: void, context?: any) {
        super(props, context);

        this.state = {
        } as IDemoState;
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