import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [UserModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
