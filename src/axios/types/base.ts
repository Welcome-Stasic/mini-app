export interface IApiResponse<T> {
  data: T;
  message: string | null;
  success: boolean;
}
