import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({
  name: 'admin_user',
})
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    comment: '密码',
  })
  password: string;
}
