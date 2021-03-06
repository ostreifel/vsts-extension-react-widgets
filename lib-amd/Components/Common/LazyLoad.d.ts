/// <reference types="react" />
import * as React from "react";
export interface ILazyLoadProps {
    module: string;
    children?: any;
}
export interface ILazyLoadState {
    isLoaded: boolean;
    fetchedModule: any;
}
export declare class LazyLoad extends React.Component<ILazyLoadProps, ILazyLoadState> {
    private _isMounted;
    constructor(props: ILazyLoadProps, context?: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ILazyLoadProps): void;
    componentWillUnmount(): void;
    private _load(moduleName);
    render(): JSX.Element;
}
