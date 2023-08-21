import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { PrismaController } from './prisma.controller';

@Module({
  providers: [PrismaService, UserService, PostService],
  controllers: [PrismaController]
})
export class DemoPrismaModule {}
