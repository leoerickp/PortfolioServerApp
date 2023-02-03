import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { CreateUserDto, UpdateUserDto } from './dto/inputs';
import { User } from './entities/user.entity';
import { SignUpDto } from '../auth/dto/inputs/signup.dto';

@Injectable()
export class UsersService {
  private defaultLimit: number;
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit'); // check env.config.ts
  }

  async create(signUpDto: SignUpDto): Promise<User> {
    try {
      const user = await this.usersModel.create({
        ...signUpDto,
        password: bcrypt.hashSync(signUpDto.password, 10)
      });
      return user;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(validRoles: ValidRolesArgs, pagination: PaginationArgs): Promise<User[]> {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    if (!validRoles.roles || validRoles.roles.length === 0) {
      return await this.usersModel.find()
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .limit(limit)
        .skip(offset);
    } else {
      return await this.usersModel.find({ roles: validRoles.roles })
        .populate({ path: 'lastUpdateBy', select: 'name email' })
        .limit(limit)
        .skip(offset);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await (await this.usersModel.findById(id))
      .populate({ path: 'lastUpdateBy', select: 'name email' });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUser: User) {
    const userUpdated = await this.usersModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        lastUpdateBy: currentUser,
        createdBy: new Date()
      },
      { new: true })
      .populate({ path: 'lastUpdateBy', select: 'name email' });
    if (!userUpdated) {
      throw new NotFoundException(`${id} not found`);
    }
    return userUpdated;
  }

  async block(id: string, currentUser: User): Promise<User> {
    return await this.update(id, { isActive: false }, currentUser);
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`User exists in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create User - Check server`);
  }
}
