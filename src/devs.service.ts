import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dev } from './schemas/dev.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DevsService {
  constructor(
    @InjectModel(Dev.name) private devModel: Model<Dev>,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('IDEAS_SERVICE') private readonly ideasClient: ClientProxy,
  ) {}
  async create(createDevDto: CreateDevDto) {
    try {
      const user = await firstValueFrom(
        this.usersClient.send<string>('findByUsername', createDevDto.creator),
      );
      if (!user) return new BadRequestException('User Not Found');

      const idea = await firstValueFrom(
        this.ideasClient.send<ObjectId>('findOneIdea', createDevDto.ideaID),
      );
      if (!idea) return new BadRequestException('Idea Not Found');

      const dev = new this.devModel(createDevDto);
      return await dev.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Dev[]> {
    return await this.devModel.find().exec();
  }

  async findOne(id: ObjectId): Promise<Dev> {
    return await this.devModel.findById(id);
  }

  async update(id: ObjectId, updateDevDto: UpdateDevDto): Promise<any> {
    return await this.devModel.updateOne({ _id: id }, updateDevDto);
  }

  async remove(id: ObjectId): Promise<any> {
    const objectId: ObjectId = new ObjectId(id);
    return await this.devModel.deleteOne(objectId);
  }
}
