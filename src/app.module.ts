import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [MenuModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
