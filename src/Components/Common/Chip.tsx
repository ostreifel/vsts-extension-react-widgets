import "../../css/Chip.scss";

import * as React from "react";

import { Label } from "OfficeFabric/Label";

export interface IChipProps extends React.HTMLProps<HTMLLabelElement> {
    label: string;
    onDelete: () => void;
}

export var Chip: React.StatelessComponent<IChipProps> =
    (props: IChipProps): JSX.Element => {
        return null;
}