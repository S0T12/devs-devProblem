import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dev } from './schemas/dev.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class DevsService {
  constructor(@InjectModel(Dev.name) private devModel: Model<Dev>) {}
  async create(createDevDto: CreateDevDto) {
    try {
      const dev = new this.devModel(createDevDto);
      await dev.save();
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
    return await this.devModel.updateOne(id, updateDevDto);
  }

  async remove(id: ObjectId): Promise<any> {
    return await this.devModel.deleteOne(id);
  }
}
