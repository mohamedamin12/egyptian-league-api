import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PlayersModule } from './players/players.module';
import { Team } from './teams/entities/team.entity';
import { Player } from './players/entities/player.entity';


@Module({
  imports: [
    TeamsModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config : ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: config.get<number>("DB_PORT"),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_NAME"),
          synchronize: process.env.NODE_ENV !== 'production',
          entities:[Team , Player]
        }
      }
    }), 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development'
    }),

    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    PlayersModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],

})
export class AppModule {}
