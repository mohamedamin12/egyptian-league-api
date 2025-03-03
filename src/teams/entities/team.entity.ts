import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from '../../players/entities/player.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  stadium: string;

  @Column()
  shirtColor: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}

