import { FileDto } from "./certificateTypes";
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

export type EventsResponse = {
    results: EventDto[];
    metaData: Pagination;
}