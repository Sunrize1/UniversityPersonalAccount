export enum UserType {
    Student = 'Student',
    Employee = 'Employee'
}

export enum ContactType {
    Phone = 'Phone',
    Email = 'Email',
    SocialMedia = 'SocialMedia'
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    NotDefined = 'NotDefined'
}

export interface Contact {
    value: string;
    type: ContactType;
}

export interface Citizenship {
    id: string;
    name: string;
    code: string;
}

export interface Avatar {
    id: string;
    name: string;
    extension: string;
    size: number;
}

export interface ProfileResponse {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    birthDate: Date;
    gender: Gender;
    avatar: Avatar;
    citizenship: Citizenship;
    address: string;
    contacts: Array<Contact>;
    userTypes: Array<UserType>;
}