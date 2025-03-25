import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PriorityEnum } from '../enums/priority.enum';
import { ProjectType } from '../enums/project-type.enum';
import { ProjectStatus } from '../enums/status.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsEnum(PriorityEnum)
  @IsOptional()
  priority: PriorityEnum;

  // in hour
  @IsNumber()
  @IsOptional()
  timeEstimated: number;

  @IsNumber()
  @IsOptional()
  timeTracked: number;

  @IsEnum(ProjectType)
  @IsOptional()
  projectType: ProjectType;

  @IsNumber()
  @IsOptional()
  projectValue: number;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status: ProjectStatus;
}
