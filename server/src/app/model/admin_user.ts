import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminRole } from './admin_role';

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
    select: false,
    comment: '密码',
  })
  password: string;

  @ManyToOne(type => AdminRole, role => role.users)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  role: AdminRole;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
