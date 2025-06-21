import { FileDto } from "./certificateTypes";
import { Gender } from "./profileResponse";
import { Pagination } from "./UsefulServicesResponse";

export type EventDto = {
    id: string;
    title: string;
    description: string;
    picture: FileDto;
    isTimeFromNeeded: boolean;
    dateTimeFrom: string;
    isTimeToNeeded: boolean;
    dateTimeTo: string;
    type: EventType;
    format: EventFormat;
    auditory: EventAuditory;
    status: EventStatus;
}

export enum EventType {
    Open = 'Open',
    Close = 'Close'
}

export enum EventFormat {
    Online = 'Online',
    Offline = 'Offline'
}

export enum EventAuditory {
    All = 'All',
    Students = 'Students',
    Employees = 'Employees'
}
export enum EventStatus {
    Draft = 'Draft',
    Actual = 'Actual',
    Finished = 'Finished',
    Archive = 'Archive'
}

export enum EventParticipantType {
    Inner = 'Inner',
    External = 'External'
}

export type EventsResponse = {
    results: EventDto[];
    metaData: Pagination;
}

export type EventFullDto = {
    id: string;
    title: string;
    description: string;
    picture: FileDto;
    isTimeFromNeeded: boolean;
    dateTimeFrom: string;
    isTimeToNeeded: boolean;
    dateTimeTo: string;
    type: EventType;
    format: EventFormat;
    auditory: EventAuditory;
    status: EventStatus;
    link: string;
    addressName: string;
    latitude: number;
    longitude: number;
    isRegistrationRequired: boolean;
    registrationLastDate: string;
    isDigestNeeded: boolean;
    notificationText: string;
    digestText: string;
    author: UserShortDto;
    participants: EventParticipantDto[];
}



export type EventParticipantDto = {
    id: string;
    user: UserShortDto;
    email: string;
    name: string;
    phone: string;
    additionalInfo: string;
    participantType: EventParticipantType;

}

export type UserShortDto = {
    id: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    birthDate: string;
    gender: Gender;
    email: string;
    avatar: FileDto;
}

export type IsParticipatingDto = {
    isParticipating: boolean;
}


export type InnerEventRegisterRequest = {
    eventId: string;
}

export type ExternalEventRegisterRequest = {
    eventId: string;
    name: string;
    email: string;
    phone: string;
    additionalInfo: string;
}