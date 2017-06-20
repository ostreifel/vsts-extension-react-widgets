import "./CommonComponentsDemo.scss";

import * as React from "react";

import {Loading} from "../src/Components/Common/Loading";
import {InputError} from "../src/Components/Common/InputError";
import {InfoLabel} from "../src/Components/Common/InfoLabel";
import {MessagePanel, MessageType} from "../src/Components/Common/MessagePanel";
import {IdentityView} from "../src/Components/WorkItemControls/IdentityView";

interface ICommonComponentsDemoState {

}

export class CommonComponentsDemo extends React.Component<{}, ICommonComponentsDemoState> {
    constructor(props: {}, context?: any) {
        super(props, context);

        this.state = {
        } as ICommonComponentsDemoState;
    }

    public render(): JSX.Element {
        return (
            <div className="flex-container row">                
                <div className="flex-child">
                    <Loading />
                    <InputError error="This is an input error" />
                    <MessagePanel messageType={MessageType.Success} message={"No results."} />
                    <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />
                    <InfoLabel info="Information" label="Info" />
                </div>
            </div>
        );
    }
}