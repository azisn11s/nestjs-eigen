import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { RegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: LoginDto) {
    //   find user by email
    const user =
      await this.prismaService.user.findUnique({
        where: {
          msisdn: dto.msisdn,
        },
      });
    // if user doesnt exists throw an exception
    if (!user) {
      throw new ForbiddenException(
        'Credential incorrect.',
      );
    }
    // compare password using bcrypt
    const passMatches = await bcrypt.compare(
      dto.password,
      user.password,
    );

    // compare password using argon2
    // const passMatches = await argon.verify(
    //   user.password,
    //   dto.password,
    // );
    // if password incorrect  throe exception
    if (!passMatches) {
      throw new ForbiddenException(
        'Credential incorrect.',
      );
    }
    return this.signToken(user.id, user.msisdn);
  }

  async signup(dto: RegisterDto) {
    try {
      // generate hash (bcrypt)
      const hashCode = await bcrypt.hash(
        dto.password,
        10,
      );

      // hash using argon2
      // const hashCode = await argon.hash(
      //   dto.password,
      // );

      // save new user
      const user =
        await this.prismaService.user.create({
          data: {
            username: dto.username,
            msisdn: dto.msisdn,
            password: hashCode,
            name: dto.name,
          },
          //   select: {
          //     id: true,
          //     email: true,
          //     created_at: true,
          //   },
        });

      delete user.password;
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credential taken.',
          );
        }
      }

      throw error;
    }
  }

  async signToken(
    userId: string,
    msisdn: string,
  ): Promise<{ token: string }> {
    const payload = {
      id: userId,
      msisdn,
    };

    const token = await this.jwtService.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      },
    );

    return { token };
  }
}
