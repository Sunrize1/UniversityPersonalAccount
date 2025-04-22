export interface EducationEntry {
    id: string;
    faculty: { id: string; name: string };
    group: { id: string; name: string };
    educationStatus: { id: string; name: string };
    educationBase: { id: string; name: string };
    educationDirection: { id: string; name: string };
    educationProfile: { id: string; name: string };
    educationQualification: { id: string; name: string };
    educationLevel: { id: string; name: string };
    educationForm: { id: string; name: string };
    educationYears: { id: string; name: string };
    creditBooknumber: string;
    course: number;
    admissionYear: number;
}

export interface Experience {
    id: string;
    years: number;
    months: number;
    type: string;
}

export  interface Post {
    id: string;
    rate: number;
    departments: Array<{ id: string; name: string; parentId: string; email: string }>;
    postType: { id: string; name: string };
    postName: { id: string; name: string };
    dateStart: string;
    dateEnd: string;
    employmentType: string;
}

export interface StudentProfile {
    id: string;
    educationEntries: EducationEntry[];
}

export interface EmployeeProfile {
    id: string;
    experience: Experience[];
    posts: Post[];
}