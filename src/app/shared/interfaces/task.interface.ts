export interface ITask {
    title: string;
    description: string;
    createBy: string;
    isDone: boolean;
    deadline: Date;
    sharedTo: Array<string>;
    id?: string;
}