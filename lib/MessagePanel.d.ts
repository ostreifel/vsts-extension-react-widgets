/// <reference types="react" />
import "./css/MessagePanel.scss";
import * as React from "react";
export interface IMessagePanelInputs {
    Message: string;
    MessageType: string;
}
export interface IMessagePanelProps {
    message: string;
    messageType: MessageType;
}
export declare enum MessageType {
    Error = 0,
    Warning = 1,
    Info = 2,
    Success = 3,
}
export declare var MessagePanel: React.StatelessComponent<IMessagePanelProps>;
