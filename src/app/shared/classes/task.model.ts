import { ITask } from '../interfaces/task.interface';

export class Task implements ITask {
    constructor(
        public title: string,
        public description: string,
        public createBy: string,
        public isDone: boolean,
        public deadline: Date,
        public sharedTo: Array<string>,
        public id?: string,
    ) { }
}