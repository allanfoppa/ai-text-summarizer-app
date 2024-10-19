import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context)))
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException ? exception?.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      metadata: {
        status: "error",
        statusCode: status,
        errorInfo: {
          path: request.url,
          message: exception.message,
          timestamp: new Date().toISOString(),
        },
      }
    });
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;

    return {
      metadata: {
        status: "success",
        statusCode: statusCode,
        successInfo: {
          path: request.url,
          message: res.metadata.message,
          timestamp: new Date().toISOString(),
        }
      },
      data: res.content,
    };
  }
}
