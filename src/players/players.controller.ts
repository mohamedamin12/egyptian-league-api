import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { TransferPlayerDto } from './dto/transfer-player.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { AuthGuard } from 'src/admin/guards/auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  deletePlayer(@Param('id') id: string) {
    return this.playersService.deletePlayer(id);
  }

  @Put(':id/transfer')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  transferPlayer(@Param('id') id: string, @Body() transferPlayerDto: TransferPlayerDto) {
    return this.playersService.transferPlayer(id, transferPlayerDto);
  }

  @Put(':id/salary')
  @UseGuards(AuthGuard)
  @ApiSecurity('bearer')
  updateSalary(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
    return this.playersService.updateSalary(id, updateSalaryDto);
  }

}
