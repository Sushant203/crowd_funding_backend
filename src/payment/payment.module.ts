import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Campaign } from 'src/campaign/entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Campaign])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
