import "../../css/MessagePanel.scss";

import * as React from "react";

import {Icon, IconName} from "OfficeFabric/Icon";
import {Label} from "OfficeFabric/Label";

export interface IMessagePanelProps {
    message: string;
    messageType: MessageType;
    closeable?: boolean;
}

export enum MessageType {
    Error,
    Warning,
    Info,
    Success
}

export var MessagePanel: React.StatelessComponent<IMessagePanelProps> =
    (props: IMessagePanelProps): JSX.Element => {
        let className = "message-panel";
        let iconName: IconName;

        switch (props.messageType) {
            case MessageType.Error:
                iconName = "StatusErrorFull";
                className += " message-error";
                break;
            case MessageType.Warning:
                iconName = "Warning";
                className += " message-warning";
                break;
            case MessageType.Success:
                iconName = "SkypeCircleCheck";
                className += " message-success";
                break;
            default:
                iconName = "Info";
                className += " message-info";
                break;
        }

        return (
            <div className={className}>
                <Icon className="icon" iconName={iconName} />
                <Label className="message-text">{props.message}</Label>
                { 
                    props.closeable && 
                    <span title="Close" className="close-icon" onClick={}>
                        <Icon iconName="Cancel" />
                    </span>
                }
            </div>
        );
}