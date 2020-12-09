export class UserDto {
    static allFields = [
      'userDto.userName',
      'userDto.gender',
      'userDto.description',
      'userDto.email',
      'userDto.maxSearchDistanceFilter',
      'userDto.ageFromFilter',
      'userDto.ageToFilter',
      'userDto.genderFilter',
    ]

    userName: string;

    gender: number;

    dateOfBirth: string;

    description: string;

    email: string;

    maxSearchDistanceFilter: number;

    ageFromFilter: number;

    ageToFilter: number;

    genderFilter: number;
}
