import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateShirtColorDto } from './dto/update-shirt-color.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Put(':id/shirt-color')
  updateShirtColor(@Param('id') id: string, @Body() updateShirtColorDto: UpdateShirtColorDto) {
    return this.teamsService.updateShirtColor(id, updateShirtColorDto);
  }
}
