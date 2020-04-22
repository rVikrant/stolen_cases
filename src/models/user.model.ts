import { Column, Model, Table, CreatedAt, DeletedAt, UpdatedAt, DataType, Index } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({autoIncrement: true, primaryKey: true, allowNull: false, unique: true, type: DataType.BIGINT})
  id: bigint;

  @Index
  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await User.findOne({ where: { email: value } });
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
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ type: DataType.ENUM("ACTIVE", "DELETED", "BLOCKED"), defaultValue: 'ACTIVE', allowNull: false })
  status: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}