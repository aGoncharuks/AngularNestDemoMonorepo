import { GenericResponse, GenericResponseStatus } from './data.type';

export const GENERIC_RESPONSE: {[key: string]: GenericResponse} = {
  OK: {
    status: GenericResponseStatus.OK
  },
  ERROR: {
    status: GenericResponseStatus.ERROR
  }
}
