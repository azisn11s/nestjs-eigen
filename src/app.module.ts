import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LogisticModule } from './logistic/logistic.module';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    LogisticModule,
    BookModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
