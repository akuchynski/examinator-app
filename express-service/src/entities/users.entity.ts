import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column({ name: 'first_name' })
  @IsNotEmpty()
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty()
  lastName: string;

  @Column({ name: 'is_obfuscated' })
  isObfuscated: boolean;

  @Column({ name: 'global_id' })
  globalId: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ name: "created_at" })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: "updated_at" })
  @UpdateDateColumn()
  updatedAt: Date;
}
