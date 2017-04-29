/// <reference types="react" />
import "../../css/Tags.scss";
import * as React from "react";
export interface ITagsViewProps extends React.HTMLProps<HTMLLabelElement> {
    tags: string[];
}
export declare var TagsView: React.StatelessComponent<ITagsViewProps>;
