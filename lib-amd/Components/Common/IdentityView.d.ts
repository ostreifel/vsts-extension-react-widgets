/// <reference types="react" />
import "../../css/IdentityView.scss";
import * as React from "react";
export declare enum IdentitySize {
    Small = 0,
    Medium = 1,
    Large = 2,
}
export interface IIdentityViewProps {
    identityDistinctName: string;
    size?: IdentitySize;
    className?: string;
}
export declare var IdentityView: React.StatelessComponent<IIdentityViewProps>;
