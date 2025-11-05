import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservedStatesService } from './reserved_states.service';
import { CreateReservedStateDto } from './dto/create-reserved_state.dto';
import { UpdateReservedStateDto } from './dto/update-reserved_state.dto';

@Controller('reserved-states')
export class ReservedStatesController {
  constructor(private readonly reservedStatesService: ReservedStatesService) {}

  @Post()
  create(@Body() createReservedStateDto: CreateReservedStateDto) {
    return this.reservedStatesService.create(createReservedStateDto);
  }

  @Get()
  findAll() {
    return this.reservedStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedStatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservedStateDto: UpdateReservedStateDto) {
    return this.reservedStatesService.update(+id, updateReservedStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedStatesService.remove(+id);
  }
}
