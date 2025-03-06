export class ResponseDto<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: number;

  constructor(success: boolean, message: string, data: T, errorCode?: number) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errorCode = errorCode;
  }
}
