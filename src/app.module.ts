import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RentModule } from './rent/rent.module';

@Module({
  imports: [UserModule, ExpenseModule, PrismaModule, AuthModule, RentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
