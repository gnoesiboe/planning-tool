import { ProjectWithItemCount } from './../planning.d';
import {
    Result,
    ResultWithItemCount,
} from './../../repository/database/projectRepository';
import { FormValues } from '../../components/projectForm/hooks/useHandleFormState';
import { Project } from './../planning';
import { RequestBody } from './../../server/controller/project/createController';
import { createUuid } from '../../utility/idGenerator';
import { omit } from 'lodash';

export function createProjectFromRequestInput(input: RequestBody): Project {
    return { ...input };
}

export function createProjectFromFormInput(values: FormValues): Project {
    const id = createUuid();

    return { ...values, id };
}

export function createProjectFromDatabaseResult(result: Result): Project {
    return {
        ...result,
        active: !!result.active,
    };
}

export function createProjectWithItemCountFromResult(
    result: ResultWithItemCount
): ProjectWithItemCount {
    const regularResult = omit(
        createProjectFromDatabaseResult(result),
        'no_of_items'
    );

    return {
        ...regularResult,
        noOfItems: result.no_of_items,
    };
}
