import { Module } from '@nestjs/common';
import { HardSkillsService } from './hard-skills.service';
import { HardSkillsController } from './hard-skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HardSkill, HardSkillSchema } from './entities/hard-skill.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [HardSkillsController],
  providers: [HardSkillsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name: HardSkill.name,
      schema: HardSkillSchema
    }])
  ],
  exports: [
    MongooseModule,
    HardSkillsModule
  ]
})
export class HardSkillsModule { }
