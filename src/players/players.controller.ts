import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { TransferPlayerDto } from './dto/transfer-player.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.playersService.deletePlayer(id);
  }

  @Patch(':id/transfer')
  transferPlayer(@Param('id') id: string, @Body() transferPlayerDto: TransferPlayerDto) {
    return this.playersService.transferPlayer(id, transferPlayerDto);
  }

  @Patch(':id/salary')
  updateSalary(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.playersService.updateSalary(id, updateSalaryDto);
  }

}
