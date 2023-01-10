import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { PositionsService } from '../positions/positions.service';
import { PositionsModule } from '../positions/positions.module';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, PositionsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Experience.name,
        schema: ExperienceSchema
      }
    ]),
    PositionsModule
  ],
  exports: [
    MongooseModule,
    ExperiencesModule
  ]
})
export class ExperiencesModule { }
