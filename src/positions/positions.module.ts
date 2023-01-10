import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './entities/position.entity';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Position.name,
        schema: PositionSchema
      }
    ]),
  ],
  exports: [
    MongooseModule,
    PositionsModule
  ]
})
export class PositionsModule { }
