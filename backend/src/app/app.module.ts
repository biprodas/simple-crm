import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from '../job/jobs.module';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FileModule } from '@modules/file/file.module';
import { configValidationSchema } from 'src/config/config.schema';
import configs from '../config';
import { TaskModule } from '@modules/task/task.module';
import { LogModule } from '@modules/log/log.module';
import { AdminModule } from '@admin/admin.module';
import { MailModule } from '@modules/mail/mail.module';
import { CountryModule } from '@modules/country/country.module';
import { CategoryModule } from '@modules/category/department.module';
import { ContactModule } from '@modules/contact/contact.module';
import { DealModule } from '@modules/deal/deal.module';
import { ProjectModule } from '@modules/project/project.module';
import { LeadModule } from '@modules/lead/lead.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { InvoiceModule } from '@modules/invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ScheduleModule.forRoot(),
    JobsModule.forRoot(),
    DatabaseModule,
    AdminModule,
    FileModule,
    // CommonModule,
    // DictionaryModule,
    // WordModule,
    TaskModule,
    LogModule,
    MailModule,
    // new modules
    CategoryModule,
    CountryModule,
    LeadModule,
    CustomerModule,
    InvoiceModule,
    ContactModule,
    ProjectModule,
    DealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
