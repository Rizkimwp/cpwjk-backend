import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';

import { CreateUserDto, LoginDto, UserFilterDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    const user = await this.userService.createOrUpdate(createUser);
    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    const token = await this.authService.login(user);

    return {
      success: true,
      message: 'User berhasil login',
      data: { token },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get()
  @ApiResponse({ status: 200, description: 'List User' })
  async findAll(@Query() query: UserFilterDto) {
    const { data, total } = await this.userService.findAll(query);
    return {
      success: true,
      message: 'Request berhasil',
      data: {
        data,
        total: total,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.userService.deleteUser(id);
    return {
      success: true,
      message: 'Delete berhasil',
      data: {
        data,
      },
    };
  }
}
