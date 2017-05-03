import { AutoResizableComponent } from "./AutoResizableComponent";
import { IBaseComponentState } from "../Common/BaseComponent";
export interface IFieldControlProps {
    fieldName: string;
}
export interface IFieldControlState extends IBaseComponentState {
    error?: string;
    value?: any;
}
export declare abstract class FieldControl<TP extends IFieldControlProps, TS extends IFieldControlState> extends AutoResizableComponent<TP, TS> {
    static getInputs<T>(): T;
    private _flushing;
    protected initialize(): void;
    protected onValueChanged(newValue: any): Promise<void>;
    protected getErrorMessage(value: string): string;
    private _invalidate();
    private _getCurrentFieldValue();
    private _setValue(value);
    private _onError(error);
}
