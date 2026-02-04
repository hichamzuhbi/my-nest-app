import { Module } from '@nestjs/common';
import { PhonebookModule } from './phonebook/phonebook.module';

@Module({
  imports: [PhonebookModule],
})
export class AppModule {}
