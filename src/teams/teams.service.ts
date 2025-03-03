import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateShirtColorDto } from './dto/update-shirt-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}
 async create(createTeamDto: CreateTeamDto): Promise<Team> {
  const team = this.teamRepository.create(createTeamDto);
  return this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['players'] });
  }

  async findOne(id: string) : Promise<Team | null> {
    return this.teamRepository.findOne({ where: { id }, relations: ['players'] });
  }

  async updateShirtColor(id: string, updateShirtColorDto: UpdateShirtColorDto): Promise<Team | null> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Team not found');
    team.shirtColor = updateShirtColorDto.color;
    return this.teamRepository.save(team);
  }
}
