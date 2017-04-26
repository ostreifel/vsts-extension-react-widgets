import * as React from "react";
import * as ReactDOM from "react-dom";

import {MessagePanel, MessageType} from "../src/Components/Common/MessagePanel";

interface IDemoState {
}

export class Demo extends React.Component<void, IDemoState> {

    constructor(props: void, context?: any) {
        super(props, context);

        this.state = {
        } as IDemoState;
    }

    public render(): JSX.Element {
        return <MessagePanel message="Hello." messageType={MessageType.Info} />;
    }
}

export function init() {
    ReactDOM.render(<Demo />, $("#ext-container")[0]);
}