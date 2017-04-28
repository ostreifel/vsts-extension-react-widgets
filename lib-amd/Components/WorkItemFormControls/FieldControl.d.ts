import { AutoResizableComponent } from "./AutoResizableComponent";
export interface IFieldControlProps {
    fieldName: string;
}
export interface IFieldControlState {
    error?: string;
    value?: any;
}
export declare class FieldControl<TP extends IFieldControlProps, TS extends IFieldControlState> extends AutoResizableComponent<TP, TS> {
    static getInputs<T>(): T;
    private _flushing;
    constructor(props: TP, context?: any);
    protected initializeState(props: TP): void;
    protected onValueChanged(newValue: any): Promise<void>;
    protected getErrorMessage(value: string): string;
    private _invalidate();
    private _getCurrentFieldValue();
    private _setValue(value);
    private _onError(error);
}
