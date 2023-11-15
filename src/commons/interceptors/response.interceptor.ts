import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// DTO'S
import { ResponseDto } from '../dtos/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (context.switchToHttp().getResponse().statusCode < 400) {
          return {
            success: true,
            data,
          } as ResponseDto;
        } else {
          return data;
        }
      }),
    );
  }
}
