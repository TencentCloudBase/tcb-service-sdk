
export interface Options {
    service: string;
    action: string;
    version?: string;
    data?: any;
}

export interface ReturnValue {
    code: number;
    message: string;
    data?: any;
}