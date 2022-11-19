import { UserRole } from '@taskforce/shared-types';

export class CreateUserDto {
  public email: string;
  public city: string;
  public password: string;
  public birthDate: string;
  public role: UserRole;
  public name: string;
  public avatar?: string;
}
