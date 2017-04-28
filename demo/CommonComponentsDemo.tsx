import "./CommonComponentsDemo.scss";

import * as React from "react";

import {MessagePanel, MessageType} from "../src/Components/Common/MessagePanel";
import {Loading} from "../src/Components/Common/Loading";
import {InputError} from "../src/Components/Common/InputError";
import {InfoLabel} from "../src/Components/Common/InfoLabel";
import {IdentityView} from "../src/Components/Common/IdentityView";

interface ICommonComponentsDemoState {

}

export class CommonComponentsDemo extends React.Component<void, ICommonComponentsDemoState> {
    constructor(props: void, context?: any) {
        super(props, context);

        this.state = {
        } as ICommonComponentsDemoState;
    }

    public render(): JSX.Element {
        return (
            <div className="flex-container row">
                <div className="flex-child">
                    <MessagePanel message="Info." messageType={MessageType.Info} closeable={true} />
                    <MessagePanel message="Error." messageType={MessageType.Error} />
                    <MessagePanel message="Warning." messageType={MessageType.Warning} />
                    <MessagePanel message="Success." messageType={MessageType.Success} />
                    <Loading />
                </div>
                <div className="flex-child">
                    <InputError error="This is an input error" />
                    <IdentityView identityDistinctName="Mohit Bagra <mbagra@microsoft.com>" />
                    <InfoLabel info="Information" label="Info" />
                </div>
            </div>
        );
    }
}