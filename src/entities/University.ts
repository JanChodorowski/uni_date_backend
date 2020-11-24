/* eslint-disable import/prefer-default-export */
import {
  Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,
} from 'typeorm';

export interface IUniversity {
    name: string;
}

@Entity()
class University implements IUniversity {
    @PrimaryColumn()
    public name: string;

    constructor(newUniversity: IUniversity) {
      const { name } = newUniversity || {} as IUniversity;
      console.log('HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', name);
      this.name = name;
    }
}

export default University;
