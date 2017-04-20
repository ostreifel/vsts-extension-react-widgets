/// <reference types="react" />
import * as React from "react";
export declare class AutoResizableComponent<TP, TS> extends React.Component<TP, TS> {
    private _windowWidth;
    private _minWindowWidthDelta;
    private _windowResizeThrottleDelegate;
    constructor(props: TP, context?: any);
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    protected resize(delay?: number): void;
}
