import { Exclude } from 'class-transformer';

export class Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  favoriteColor?: string;
  nickname?: string;
  email: string;
  @Exclude()
  category: string;
}
