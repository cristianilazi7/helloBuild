import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../dtos/response.dto';

@Injectable()
export class ResponseService {
  success<T>(message: string, data: T = {} as T): ResponseDto<T> {
    return new ResponseDto<T>(true, message, data);
  }

  error<T>(
    message: string,
    errorCode: number,
    data: T = {} as T,
  ): ResponseDto<T> {
    return new ResponseDto<T>(false, message, data, errorCode);
  }
}
