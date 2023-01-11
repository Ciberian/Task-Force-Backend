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
  public rating?: number;
  public failuresCount?: number;

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
    this.avatar = user?.avatar;
    this.birthDate = user.birthDate;
    this.rating = user?.rating;
    this.failuresCount = user.failuresCount;
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
