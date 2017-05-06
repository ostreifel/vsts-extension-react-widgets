import * as React from "react";
import { Loading } from "./Loading";

export interface ILazyLoadProps {
    module: string;
    children?: any;
}

export interface ILazyLoadState {
    isLoaded: boolean;
    fetchedModule: any;
}

export class LazyLoad extends React.Component<ILazyLoadProps, ILazyLoadState> {
    private _isMounted: boolean;

    constructor(props: ILazyLoadProps, context?: any) {
        super(props, context);

        this._isMounted = false;
        this.state = {
            isLoaded: false,
            fetchedModule: null
        };        
    }

    public componentDidMount() {
        this._isMounted = true;
        this._load();
    }

    public componentDidUpdate(previousProps: ILazyLoadProps) {        
        if (this.props.module !== previousProps.module) {
            this._load();
        }
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    private _load() {
        this.setState({
            isLoaded: false,
        });

        requirejs([this.props.module], (result) => {
            this.setState({ fetchedModule: result, isLoaded: true });
        })
    }

    public render(): JSX.Element {
        if (!this.state.isLoaded) {
            return <Loading />;
        }
        return React.Children.only(this.props.children(this.state.fetchedModule));
    }
}