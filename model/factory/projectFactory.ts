import { FormValues } from './../../components/addProject/hooks/useHandleFormState';
import { Project } from './../planning';
import { RequestBody } from './../../server/controller/project/createController';
import { createUuid } from '../../utility/idGenerator';

export function createProjectFromRequestInput(input: RequestBody): Project {
    return { ...input };
}

export function createProjectFromFormInput(values: FormValues): Project {
    const id = createUuid();

    return { ...values, id };
}
