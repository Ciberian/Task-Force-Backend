import { Expose } from 'class-transformer';
import { City, UserRole } from '@taskforce/shared-types';

export class UserRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public city: City;

  @Expose()
  public role: UserRole;

  @Expose()
  public avatar: string;

  @Expose()
  public birthDate: string;
}
