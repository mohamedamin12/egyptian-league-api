import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateShirtColorDto } from './dto/update-shirt-color.dto';
import { AuthGuard } from 'src/admin/guards/auth.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Put(':id/shirt-color')
  @UseGuards(AuthGuard)
  updateShirtColor(@Param('id') id: string, @Body() updateShirtColorDto: UpdateShirtColorDto) {
    return this.teamsService.updateShirtColor(id, updateShirtColorDto);
  }
}
