// core/responses/ApiResponse.ts
export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  details?: any;

  constructor(success: boolean, message: string, data: T, details?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.details = details;
  }

  static success<T>(message: string, data: T) {
    return new ApiResponse<T>(true, message, data);
  }

  static error(message: string, details?: any) {
    return new ApiResponse<null>(false, message, null, details);
  }
}
