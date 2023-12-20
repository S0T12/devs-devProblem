import { Module } from '@nestjs/common';
import { DevsController } from './devs.controller';
import { DevsService } from './devs.service';
@Module({
  imports: [],
  controllers: [DevsController],
  providers: [DevsService],
})
export class AppModule {}
