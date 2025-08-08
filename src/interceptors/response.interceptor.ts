import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message:
          typeof data === 'object' && data !== null && 'message' in data
            ? (data as any).message
            : 'Request berhasil',
        data:
          typeof data === 'object' && data !== null && 'data' in data
            ? (data as any).data
            : data,
      })),
    );
  }
}
