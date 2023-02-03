import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDeveloperRoleDto, UpdateDeveloperRoleDto } from './dto/inputs';
import { User } from 'src/users/entities/user.entity';
import { DeveloperRole } from './entities/developer-role.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class DeveloperRolesService {

  constructor(
    @InjectModel(DeveloperRole.name)
    private readonly developerRolesModel: Model<DeveloperRole>
  ) { }

  async create(createDeveloperRoleDto: CreateDeveloperRoleDto, user: User): Promise<DeveloperRole> {
    try {
      const developerRole = await this.developerRolesModel.create({ ...createDeveloperRoleDto, lastUpdateBy: user });
      return developerRole;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(): Promise<DeveloperRole[]> {
    const developerRoles = await this.developerRolesModel.find().populate({ path: 'lastUpdateBy', select: 'name email' });
    return developerRoles;
  }

  async findOne(id: string): Promise<DeveloperRole> {
    const developerRole = await this.developerRolesModel.findById(id).populate({ path: 'lastUpdateBy', select: 'name email' });
    if (!developerRole) {
      throw new NotFoundException(`${id} not found in db`);
    }
    return developerRole;
  }

  async update(id: string, updateDeveloperRoleDto: UpdateDeveloperRoleDto, user: User) {
    try {
      const developerRole = await this.developerRolesModel.findByIdAndUpdate(id, {
        ...updateDeveloperRoleDto,
        updatedDate: new Date(),
        lastUpdateBy: user
      }).populate({ path: 'lastUpdateBy', select: 'name email' })
      if (!developerRole) {
        throw new NotFoundException(`${id} not found in db`);
      }
      return developerRole;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.developerRolesModel.findByIdAndRemove(id);
      if (!result) {
        throw new NotFoundException(`${id} not found in db`);
      }
      return !!result;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async parseValidRolesId(developerRolesId: string[]): Promise<DeveloperRole[]> {
    let developerRoles: DeveloperRole[] = [];
    if (developerRolesId) {
      for (const Id of developerRolesId) {
        if (!isValidObjectId(Id)) {
          throw new BadRequestException(`One or more of sended "id Roles" are not valid`);
        }
        const role = await this.developerRolesModel.findById(Id);
        if (!role) {
          throw new BadRequestException(`One or more of sended "Roles" does not exist`);
        }
        developerRoles.push(role);
      }

    }
    return developerRoles;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`"Developer role" exists in db ${JSON.stringify(error.keyValue)}`)
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message)
    }
    throw new InternalServerErrorException(`Can't create "developer role" - Check server`);
  }
}
