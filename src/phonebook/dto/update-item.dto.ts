import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateContactDto extends PartialType(CreateContactDto) {}
