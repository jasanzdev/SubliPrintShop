export interface GqlBadRequestErrorResponse {
  message: string;
  extensions: {
    statusCode?: number;
    error: string;
    responseData?: {
      error: string;
      statusCode: number;
      message: [
        {
          field?: number;
          message?: string[];
        },
      ];
    };
  };
}
