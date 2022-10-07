import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import APM from '../service/apm';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const error = exception.getResponse();

        let status =
            error['statusCode'] || error['status'] || exception.getStatus();
        let message = error['error'] || exception.name;

        if (error['response']) {
            message = error['response']['message'];
        } else {
            message = error['message'];
        }

        if (error['name'] === 'MongoError') {
            status = 502;
        }

        if (error['message'] === 'Forbidden resource') {
            message = '资源未找到';
        }

        if (status === 502) {
            message = '数据异常';
        }

        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });

        const assign = exception;
        if (error) {
            Object.assign(assign, error);
        }

        // http错误异常进行apm上报
        APM.setTransactionName(host, assign);
    }
}
