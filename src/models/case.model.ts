import { Column, Model, Table, CreatedAt, DeletedAt, UpdatedAt, DataType, ForeignKey, Index } from 'sequelize-typescript';
import {User} from "./user.model";
import {Officer} from "./officer.model";

@Table
export class Case extends Model<Case> {
  @Column({autoIncrement: true, primaryKey: true, allowNull: false, unique: true, type: DataType.BIGINT})
  id: number;

  @ForeignKey(() => User)
  @Column
  user: number;

  @ForeignKey(() => Officer)
  @Column
  officer: number;

  @Column
  bikeNo: string;

  @Column
  bikeColor: string;

  @Column({defaultValue: false})
  isResolved: boolean;

  @Column({ type: DataType.FLOAT(7,4), allowNull: false, validate: { min: -90, max: 90 }, defaultValue: 0.0 })
  latitude: number;

  @Column({ type: DataType.FLOAT(7,4), allowNull: false, validate: { min: -180, max: 180 }, defaultValue: 0.0 })
  longitude: number;

  @Column({ type: DataType.ENUM("ACTIVE", "DELETED", "BLOCKED"), defaultValue: 'ACTIVE', allowNull: false })
  status: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}