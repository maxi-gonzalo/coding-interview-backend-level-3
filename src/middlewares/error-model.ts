export class ErrorModel {
  /**
   *  Error code to identifies the error.
   */
  public code: string;
  /**
   * Error status code.
   */
  public status: number;
  /**
   * Any additional information about error
   */
  public message?: any;
  /**
   * to notify success always in false
   */
  public success: boolean;
}
