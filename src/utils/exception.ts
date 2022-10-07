import { HttpException, HttpStatus } from '@nestjs/common';

export const SendBadRequest = (message: string, statusCode?: number) => {
    throw new HttpException(
        {
            statusCode: statusCode || HttpStatus.FORBIDDEN,
            message,
        },
        statusCode || HttpStatus.FORBIDDEN,
    );
};
