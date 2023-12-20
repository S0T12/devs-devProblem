import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DevsService } from './devs.service';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';

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
  findOne(@Payload() id: number) {
    return this.devsService.findOne(id);
  }

  @MessagePattern('updateDev')
  update(@Payload() updateDevDto: UpdateDevDto) {
    return this.devsService.update(updateDevDto.id, updateDevDto);
  }

  @MessagePattern('removeDev')
  remove(@Payload() id: number) {
    return this.devsService.remove(id);
  }
}
