import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { TransferPlayerDto } from './dto/transfer-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  async create(createPlayerDto: CreatePlayerDto) : Promise<Player> {
    const player = this.playerRepository.create(createPlayerDto);
    return this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]>  {
    return this.playerRepository.find({ relations: ['team'] });
  }

  async findOne(id: string): Promise<Player | null>  {
    return this.playerRepository.findOne({ where: { id }, relations: ['team'] });
  }

  async updateSalary(id: string, updateSalaryDto: UpdateSalaryDto): Promise<Player | null> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) throw new NotFoundException('Player not found');
    player.salary = updateSalaryDto.salary;
    return this.playerRepository.save(player);
  }

  async transferPlayer(id: string, transferPlayerDto: TransferPlayerDto): Promise<Player | null> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) throw new NotFoundException('Player not found');
    player.team = { id: transferPlayerDto.newTeamId } as any;
    return this.playerRepository.save(player);
  }

  async deletePlayer(id: string): Promise<boolean> {
    const result = await this.playerRepository.delete(id);
    return result.affected !== 0;
  }
}
