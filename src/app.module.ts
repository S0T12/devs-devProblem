import { Module } from '@nestjs/common';
import { DevsController } from './devs.controller';
import { DevsService } from './devs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dev, DevSchema } from './schemas/dev.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'IDEAS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ideas_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/devs-devProblem'),
    MongooseModule.forFeature([{ name: Dev.name, schema: DevSchema }]),
  ],
  controllers: [DevsController],
  providers: [DevsService],
})
export class AppModule {}
