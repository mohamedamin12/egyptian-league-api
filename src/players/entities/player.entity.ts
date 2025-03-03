import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { PlayerPosition } from 'utils/enum';
import { CURRENT_TIMESTAMP } from 'utils/constants';



@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: PlayerPosition })
  position: PlayerPosition;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
