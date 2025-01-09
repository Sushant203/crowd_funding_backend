import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { availableMemory } from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = await this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    const userAvailable = await this.userRepository.findOneBy({ user_id });
    if (!userAvailable) {
      throw new NotFoundException(`user not found`);
    }
    return userAvailable;
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userAvailable = await this.findOne(user_id);
    if (!userAvailable) {
      throw new NotFoundException(`user not found`);
    }
    const updatedUserData = Object.assign(userAvailable, updateUserDto);
    return this.userRepository.save(updatedUserData);
  }

  async remove(user_id: number): Promise<void> {
    const userAvailable = await this.findOne(user_id);
    if (!userAvailable) {
      throw new NotFoundException(`user not found`);
    }
    await this.userRepository.remove(userAvailable);
  }
}
