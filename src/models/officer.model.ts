import { Column, Model, Table, CreatedAt, DeletedAt, UpdatedAt, DataType, Index } from 'sequelize-typescript';

@Table
export class Officer extends Model<Officer> {
  @Column({autoIncrement: true, primaryKey: true, allowNull: false, unique: true, type: DataType.BIGINT})
  id: number;

  @Index
  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await Officer.findOne({ where: { email: value } });
        if (isExist) {
          const error = new Error('user:create:emailAlreadyExist');
          next(error);
        }
        next();
      }
    }
  })
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  @Index
  @Column({defaultValue: false})
  isAvailable: boolean;

  @Index
  @Column({defaultValue: false})
  onDuty: boolean;

  @Column({ type: DataType.ENUM("ACTIVE", "DELETED", "BLOCKED"), defaultValue: 'ACTIVE', allowNull: false })
  status: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}