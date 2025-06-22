export interface ErrorPageProps {
  errorCode: string;
  titleEn: string;
  titleRu: string;
  description: string;
  showButton?: boolean;
  buttonText?: string;
  buttonPath?: string;
}

export type ErrorType = '404' | '500' | 'generic'; 