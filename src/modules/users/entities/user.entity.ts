import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// Commons
import { ROLES } from '../../../commons/models';
import { BaseEntity } from '../../../commons/baseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  dni: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  whatsApp: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.CLIENT })
  role: ROLES;

  @Column({ type: 'boolean', default: false })
  isVerify: boolean;

  @Column({ type: 'varchar', length: 255, name: 'country_code' })
  countryCode: string;

  @Column({ type: 'boolean', default: false, name: 'is_wholesaler' })
  isWholesaler: boolean;

  @Column({ type: 'boolean', default: true, name: 'is_active'})
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_dangerous'})
  isDangerous: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  @Exclude()
  transformRoleToLowerCase() {
    if (this.role) {
      this.role = this.role.toLowerCase() as ROLES;
    }
  }

  @BeforeInsert()
  @Exclude()
  async hashPassword() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
