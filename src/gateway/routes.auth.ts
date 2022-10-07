import { verifyToken } from '../utils/token';
import AuthRuleConfig from '../config/auth.rule.config';
import { SendBadRequest } from 'src/utils/exception';

const matchReqIsAuth = async (
    context,
    tokenService,
    userService,
    merchantTokenService,
    merchantService,
) => {
    const request = context.switchToHttp().getRequest();
    const path = AuthRuleConfig[request.path];
    if (!path) {
        return false;
    }

    const method =
        path[request.method.toLocaleLowerCase()] ||
        path[request.method.toLocaleUpperCase()];
    if (typeof method !== 'boolean') {
        return false;
    }

    const headers = request.headers;
    const token = verifyToken(headers.token);

    if (!method) {
        if (typeof token !== 'boolean') {
            const prefix = token.id[0];
            if (prefix === 'm') {
                request.isMerchant = true;
            }

            request.$id = token.id;
        }

        return true;
    }

    if (typeof token !== 'boolean') {
        const prefix = token.id[0];
        let data = '';
        if (prefix !== 'm') {
            token.id = Number(token.id);
            data = await tokenService.find({
                u_id: token.id,
                token: headers.token,
            });
        } else {
            data = await merchantTokenService.find({
                m_id: token.id,
                token: headers.token,
            });
        }

        if (!data) {
            SendBadRequest('未登录', 401);
        }

        let user = '';
        if (prefix !== 'm') {
            user = await userService.find_Id({
                u_id: token.id,
            });
        } else {
            user = await merchantService.find_Id({
                m_id: token.id,
            });

            request.isMerchant = true;
        }

        if (!user) {
            SendBadRequest('没有该账号', 400);
        }

        if (prefix !== 'm') {
            if (user['status'] === 2 && user['status'] === 3) {
                SendBadRequest('账号异常', 400);
            }
        } else {
            if (user['status'] !== 2 && user['status'] !== 3) {
                SendBadRequest('商家账号异常', 400);
            }
        }

        request.$id = token.id;
    }

    return true;
};

export default {
    matchReqIsAuth,
};
