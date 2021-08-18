import { LoginParams } from './userTypes'
import { postRequest } from '../../utils/http/api-manage';

enum UserUrl {
  LOGIN = '/Token/GenToken'
}

export const LOGIN = (params: LoginParams) => postRequest(UserUrl.LOGIN, params);

