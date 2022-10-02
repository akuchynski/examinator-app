import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsBoolean()
  public isObfuscated: boolean;

  @IsString()
  public globalId: string;

  @IsString()
  public password: string;
}
