import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          context.switchToHttp().getResponse().statusCode <
          HttpStatus.BAD_REQUEST
        ) {
          return {
            success: true,
            ...data,
          };
        } else {
          return data;
        }
      }),
    );
  }
}
