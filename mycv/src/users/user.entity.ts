import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('다음 id의 사용자가 입력되었습니다.', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('다음 id의 사용자가 업데이트되었습니다.', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('다음 id의 사용자가 삭제되었습니다.', this.id);
  }
}
