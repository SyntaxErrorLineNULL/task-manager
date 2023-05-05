export interface ILogger {
    Trace(message: string, ...values: any[]): void;
    Debug(message: string, ...values: any[]): void;
    Info(message: string, ...values: any[]): void;
    Warn(message: string, ...values: any[]): void;
    Error(message: string, ...values: any[]): void;
    Fatal(mergingObject: any, message: string, ...values: any[]): void;
}