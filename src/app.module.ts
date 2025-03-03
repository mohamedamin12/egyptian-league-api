import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Team } from './teams/entities/team.entity';
import { Player } from './players/entities/player.entity';
import { Admin } from './admin/entities/admin.entity';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
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
          entities:[Team , Player , Admin]
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
    TeamsModule,
    PlayersModule,
    AdminModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],

})
export class AppModule {}
