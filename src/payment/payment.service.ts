import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Campaign } from 'src/campaign/entities/campaign.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>

  ) { }
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const checkUser = await this.userRepository.findOne({ where: { user_id: createPaymentDto.user_id } });
    if (!checkUser) {
      throw new NotFoundException('user not found');
    }

    const checkCampaign = await this.campaignRepository.findOne({ where: { campaign_id: createPaymentDto.campaign_id } });
    if (!checkCampaign) {
      throw new NotFoundException('campaign not found');
    }

    const paymentData = this.paymentRepository.create({
      user: checkUser,
      campaign: checkCampaign,
      ...createPaymentDto
    })
    return this.paymentRepository.save(paymentData);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['user', 'campaign'] })
  }

  async findOne(payment_id: number): Promise<Payment> {
    const checkPayment = await this.paymentRepository.findOne({ where: { payment_id }, relations: ['user', 'campaign'] });
    if (!checkPayment) {
      throw new NotFoundException('payment not found');
    }
    return checkPayment;
  }

  async update(payment_id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const checkUser = await this.userRepository.findOne({ where: { user_id: updatePaymentDto.user_id } });
    if (!checkUser) {
      throw new NotFoundException('user not found');
    }

    const checkCampaign = await this.campaignRepository.findOne({ where: { campaign_id: updatePaymentDto.campaign_id } });
    if (!checkCampaign) {
      throw new NotFoundException('campaign not found');
    }

    const checkPayment = await this.paymentRepository.findOne({ where: { payment_id } });
    if (!checkPayment) {
      throw new NotFoundException('payment not found');
    }

    const updatedPaymentData = this.paymentRepository.create({
      user: checkUser,
      campaign: checkCampaign,
      ...updatePaymentDto
    })

    return this.paymentRepository.save(updatedPaymentData);

  }

  async remove(payment_id: number): Promise<void> {
    const checkPayment = await this.paymentRepository.findOne({ where: { payment_id } });
    if (!checkPayment) {
      throw new NotFoundException('payment not found');
    }
    await this.paymentRepository.remove(checkPayment);
  }
}
