import { Module } from '@nestjs/common';
import { DevsController } from './devs.controller';
import { DevsService } from './devs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dev, DevSchema } from './schemas/dev.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/devs-devProblem'),
    MongooseModule.forFeature([{ name: Dev.name, schema: DevSchema }]),
  ],
  controllers: [DevsController],
  providers: [DevsService],
})
export class AppModule {}
