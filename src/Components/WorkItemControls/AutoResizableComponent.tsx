import * as React from "react";

import * as Utils_Core from "VSS/Utils/Core";

export class AutoResizableComponent<TP, TS> extends React.Component<TP, TS> {
    private _windowResizeThrottleDelegate: any;

    constructor(props: TP, context?: any) {
        super(props, context);

        this._windowResizeThrottleDelegate = Utils_Core.throttledDelegate(this, 50, () => {
            this.resize();
        });

        $(window).resize(this._windowResizeThrottleDelegate);
    }

    public render(): JSX.Element {
        return null;
    }

    public componentDidMount() {
        this.resize();
    }

    public componentDidUpdate() {
        this.resize();
    }

    protected resize(delay?: number) {
        const f = () => {
            let bodyElement = document.getElementsByTagName("body").item(0) as HTMLBodyElement;            
            VSS.resize(null, bodyElement.offsetHeight);  
        }
        const throttle = Utils_Core.throttledDelegate(this, delay, f);

        if (delay) {
            throttle();
        }
        else {
            f();
        }
    }
}