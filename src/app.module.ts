import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { Campaign } from './campaign/entities/campaign.entity';
import { UpdateCampaignModule } from './update-campaign/update-campaign.module';
import { UpdateCampaign } from './update-campaign/entities/update-campaign.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [User, Campaign, UpdateCampaign]
  }), UserModule, AuthModule, CampaignModule, UpdateCampaignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
