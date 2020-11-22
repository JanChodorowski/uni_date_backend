/* eslint-disable import/prefer-default-export */
import {
  Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,
} from 'typeorm';

// @Entity()
// export class University {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     firstName!: string;

//     @Column()
//     lastName!: string;

//     @Column()
//     age!: number;
// }

export interface IUniversity {
    name: string;
}

@Entity({ name: 'university' })
class University implements IUniversity {
    @PrimaryColumn()
    public name: string;

    constructor(nameOrUniversity: string) {
      console.log('HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
      this.name = nameOrUniversity;

    //   if (typeof nameOrUniversity === 'string') {
    //     this.name = nameOrUniversity;
    //   } else {
    //     // this.name = nameOrUniversity.name || '';
    //   }
    }
}

export default University;
