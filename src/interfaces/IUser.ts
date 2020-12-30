import { GenderFilter } from '@entities/GenderFilter';
import { OneSidedRelation } from '@entities/OneSidedRelation';
import { Picture } from '@entities/Picture';
import { Interest } from '@entities/Interest';
import { University } from '@entities/University';
import { City } from '@entities/City';
import { Match } from '@entities/Match';

export interface IUser {
    id: string;
    userName: string;
    gender: string;
    dateOfBirth: string | null;
    description: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    popularity: number;
    activityIntensity: number;
    localization: string;
    isGraduated: boolean;
    fieldOfStudy: string;
    ageFromFilter: number;
    ageToFilter: number;
    maxSearchDistanceFilter: number;
    genderFilters: GenderFilter[];
    matches: Match[];
    matches2: Match[];
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
