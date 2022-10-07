import { DBMerchantService } from './../database/mongodb/merchant/index.service';
import { DBMerchantTokenService } from './../database/mongodb/merchant_token/index.service';
import { DBUserService } from './../database/mongodb/user/index.service';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Dependencies,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DBTokenService } from 'src/database/mongodb/token/index.service';
import GatewayAuth from '../gateway/routes.auth';

@Injectable()
@Dependencies('token')
@Dependencies('user')
@Dependencies('merchant_token')
@Dependencies('merchant')
export default class AppGlobalGuard implements CanActivate {
    constructor(
        private readonly tokenService: DBTokenService,
        private readonly userService: DBUserService,
        private readonly merchantTokenService: DBMerchantTokenService,
        private readonly merchantService: DBMerchantService,
    ) {}

    canActivate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return GatewayAuth.matchReqIsAuth(
            context,
            this.tokenService,
            this.userService,
            this.merchantTokenService,
            this.merchantService,
        );
    }
}
