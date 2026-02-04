import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @Matches(/^(03|70|71|76|78|79|81)[0-9]{6}$/, {
    message: 'Phone number must be a valid Lebanese number',
  })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  favoriteColor?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsEmail()
  email: string;
}
