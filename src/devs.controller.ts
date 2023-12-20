import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DevsService } from './devs.service';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { ObjectId } from 'mongodb';

@Controller()
export class DevsController {
  constructor(private readonly devsService: DevsService) {}

  @MessagePattern('createDev')
  create(@Payload() createDevDto: CreateDevDto) {
    return this.devsService.create(createDevDto);
  }

  @MessagePattern('findAllDevs')
  findAll() {
    return this.devsService.findAll();
  }

  @MessagePattern('findOneDev')
  findOne(@Payload() id: ObjectId) {
    return this.devsService.findOne(id);
  }

  @MessagePattern('updateDev')
  update(@Payload() updateDevDto: UpdateDevDto) {
    return this.devsService.update(updateDevDto.id, updateDevDto);
  }

  @MessagePattern('removeDev')
  remove(@Payload() id: ObjectId) {
    return this.devsService.remove(id);
  }
}
