import { City, UserInterface, UserRole } from '@taskforce/shared-types'
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

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(contractor: UserInterface) {
    this._id = contractor._id
    this.name = contractor.name
    this.email = contractor.email
    this.city = contractor.city
    this.passwordHash = contractor.passwordHash
    this.role = contractor.role
    this.avatar = contractor?.avatar
    this.birthDate = contractor.birthDate
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
