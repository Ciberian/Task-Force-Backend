import { City, UserInterface, UserRole } from '@taskforce/shared-types';
import { genSalt, compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements UserInterface {
  public _id: string;
  public name: string;
  public email: string;
  public city: City;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public birthDate: Date;
  public registrationDate?: string;
  public personalInfo?: string;
  public createdTasks?: number;
  public newTasks?: number;
  public specialization?: string[];
  public rank?: number;
  public rating?: number;
  public failedTasksCount?: number;
  public completedTasksCount?: number;

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: UserInterface) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.city = user.city;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.avatar = user.avatar;
    this.birthDate = user.birthDate;
    this.registrationDate = user.registrationDate;
    this.personalInfo = user.personalInfo;
    this.createdTasks = user.createdTasks;
    this.newTasks = user.newTasks;
    this.specialization = user.specialization;
    this.rank = user.rank;
    this.rating = user.rating;
    this.failedTasksCount = user.failedTasksCount;
    this.completedTasksCount = user.completedTasksCount;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
