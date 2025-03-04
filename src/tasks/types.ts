export type TaskResults = {result: TaskResultMap};
export type TaskResultMap = {[key: string]: TaskResult}
export type TaskResult = { 'success': boolean, 'message': string}
export const TaskSuccess = true;
export const TaskFail = false;