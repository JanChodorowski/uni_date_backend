import { GenderFilter } from '@entities/GenderFilter';
import { MatchedUsers } from '@entities/MatchedUsers';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { Picture } from '@entities/Picture';
import { Interest } from '@entities/Interest';
import { University } from '@entities/University';
import { City } from '@entities/City';

export interface IUser {
    id: string;
    userName: string;
    gender: string;
    dateOfBirth: string;
    description: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    popularity: number;
    activityIntensity: number;
    localization: string;
    isGraduated: boolean;
    fieldOfStudy: string;
    maxSearchDistanceFilter: number;
    ageFromFilter: number;
    ageToFilter: number;
    genderFilters: GenderFilter[];
    matchedUsers: MatchedUsers[];
    matchedUsers2: MatchedUsers[];
    oneSidedRelations: OneSidedRelation[];
    oneSidedRelations2: OneSidedRelation[];
    pictures: Picture[];
    cityFilter: City | null;
    cityName: City | null;
    interestFilter: Interest | null;
    universityFilter: University | null;
    universityName: University | null;
    interests: Interest[];
}
