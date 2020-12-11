import { City } from '@entities/City';
import { Interest } from '@entities/Interest';
import { MatchedUsers } from '@entities/MatchedUsers';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { Picture } from '@entities/Picture';
import { University } from '@entities/University';
import { UniversityAttendance } from '@entities/UniversityAttendance';

export interface IUser {
    id: string;
    userName: string;
    gender: number;
    dateOfBirth: string;
    description: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    popularity: number;
    activityIntensity: number;
    localization: number;
    maxSearchDistanceFilter: number;
    ageFromFilter: number;
    ageToFilter: number;
    genderFilter: number;
    matchedUsers: MatchedUsers[];
    matchedUsers2: MatchedUsers[];
    oneSidedRelations: OneSidedRelation[];
    oneSidedRelations2: OneSidedRelation[];
    pictures: Picture[];
    universityAttendances: UniversityAttendance[];
    city: City;
    interestIdFilter: Interest;
    universityIdFilter: University;
    interests: Interest[];
}
