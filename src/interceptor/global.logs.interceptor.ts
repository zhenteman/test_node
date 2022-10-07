import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import APM from '../service/apm';

@Injectable()
export default class GlobalLogsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 拦截器开始apm打点
        return next.handle().pipe(
            tap(() => APM.setTransactionName(context)),
            map((data) => {
                if (!data) {
                    return {
                        code: 200,
                        message: 'success',
                    };
                }

                return {
                    code: 200,
                    message: 'success',
                    data,
                };
            }),
            catchError((err) =>
                throwError(new BadGatewayException(err.response)),
            ),
        );
    }
}
