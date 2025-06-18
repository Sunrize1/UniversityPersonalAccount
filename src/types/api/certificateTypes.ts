import { UserType } from "./profileResponse";

export enum CertificateStatus {
  Created = 'Created',
  InProcess = 'InProcess',
  Finished = 'Finished'
}

export enum CertificateType {
  ForPlaceWhereNeeded = 'ForPlaceWhereNeeded',
  PensionForKazakhstan = 'PensionForKazakhstan'
}

export enum CertificateStaffType {
  ForPlaceOfWork = 'ForPlaceOfWork',
  ForExperience = 'ForExperience',
  ForVisa = 'ForVisa',
  ForWorkBookCopy = 'ForWorkBookCopy'
}

export enum CertificateReceiveType {
  Electronic = 'Electronic',
  Paper = 'Paper'
}

export enum FileExtension {
  NotDefined = 'NotDefined',
  Doc = 'Doc',
  Docx = 'Docx',
  Bmp = 'Bmp',
  Gif = 'Gif',
  Jpeg = 'Jpeg',
  Jpg = 'Jpg',
  Png = 'Png',
  Pdf = 'Pdf',
  Rar = 'Rar',
  Xls = 'Xls',
  Xlsx = 'Xlsx',
  Zip = 'Zip',
  Txt = 'Txt',
  Heic = 'Heic',
  Heif = 'Heif',
  Sig = 'Sig'
}

export interface EnumDto {
  value: number;
  name: string;
  displayName?: string;
}

export interface FileDto {
  id: string;
  name?: string;
  extension: FileExtension;
  size: number;
}

export interface CertificateDto {
  id: string;
  status: CertificateStatus;
  statusEnumDto?: EnumDto;
  type: CertificateType;
  staffType: CertificateStaffType;
  typeEnumDto?: EnumDto;
  staffTypeEnumDto?: EnumDto;
  userType: UserType;
  userTypeEnumDto?: EnumDto;
  certificateFile?: FileDto;
  signatureFile?: FileDto;
  dateOfForming: string;
  receiveType: CertificateReceiveType;
  receiveTypeEnumDto?: EnumDto;
}

export interface CreateCertificateRequest {
  type: CertificateType;
  staffType: CertificateStaffType;
  userType: UserType;
  educationEntryId?: string;
  employeePostId?: string;
  receiveType: CertificateReceiveType;
} 