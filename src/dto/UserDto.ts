export class UserDto {
    id:string

    userName: string;

    gender: string;

    dateOfBirth: string | null;

    description: string;

    email: string;

    isGraduated: boolean;

    fieldOfStudy: string;

    maxSearchDistanceFilter: number;

    ageFromFilter: number;

    ageToFilter: number;

    pictures: object[];

    city: string;

    university: string;

    interests: string[]
}
