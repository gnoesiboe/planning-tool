import { Project } from './../planning';
import { RequestBody } from './../../server/controller/project/createController';

export function createProjectFromRequestInput(input: RequestBody): Project {
    return {
        ...input,
    };
}
