import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];
  private nextId = 1;

  create(createContactDto: CreateContactDto): Contact {
    const category = createContactDto.firstName.charAt(0).toUpperCase();
    const contact: Contact = {
      id: this.nextId++,
      ...createContactDto,
      category,
    };
    this.contacts.push(contact);
    return contact;
  }

  findAll(): Record<string, Contact[]> {
    const grouped = this.contacts.reduce(
      (acc, contact) => {
        const cat = contact.category;
        if (!acc[cat]) {
          acc[cat] = [];
        }
        acc[cat].push(contact);
        return acc;
      },
      {} as Record<string, Contact[]>,
    );
    return grouped;
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
    this.contacts[contactIndex].category = this.contacts[contactIndex].firstName
      .charAt(0)
      .toUpperCase();
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
