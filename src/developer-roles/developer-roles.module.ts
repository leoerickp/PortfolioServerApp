import { Module } from '@nestjs/common';
import { DeveloperRolesService } from './developer-roles.service';
import { DeveloperRolesController } from './developer-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperRole, DeveloperRoleSchema } from './entities/developer-role.entity';

@Module({
  controllers: [DeveloperRolesController],
  providers: [DeveloperRolesService],
  imports: [
    MongooseModule.forFeature([{
      name: DeveloperRole.name,
      schema: DeveloperRoleSchema
    }]),
  ],
  exports: [
    MongooseModule,
    DeveloperRolesModule
  ]
})
export class DeveloperRolesModule { }
