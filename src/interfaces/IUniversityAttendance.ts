import { University } from '@entities/University';
import { User } from '@entities/User';

export interface IUniversityAttendance {
    universityName: string;
    userId: string;
    isGraduated: boolean;
    fieldOfStudy: string;
    universityName2: University;
    user: User;
  }
