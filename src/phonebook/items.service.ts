import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];
  private nextId = 1;

  create(createContactDto: CreateContactDto): Contact {
    const contact: Contact = {
      id: this.nextId++,
      ...createContactDto,
      category: '',
    };
    this.contacts.push(contact);
    return contact;
  }

  findAll(): Contact[] {
    return this.contacts;
  }

  findOne(id: number): Contact {
    const contact = this.contacts.find((contact) => contact.id === id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  update(id: number, updateContactDto: UpdateContactDto): Contact {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === id,
    );
    if (contactIndex === -1) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.contacts[contactIndex] = {
      ...this.contacts[contactIndex],
      ...updateContactDto,
    };
    return this.contacts[contactIndex];
  }

  remove(id: number): void {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === id,
    );
    if (contactIndex === -1) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.contacts.splice(contactIndex, 1);
  }
}
