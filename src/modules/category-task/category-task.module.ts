import { Module } from '@nestjs/common';
import { CategoryTaskService } from './category-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryRepository from '../../application/repository/category.repository';
import { CategoryTaskController } from './category-task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryTaskController],
  providers: [CategoryTaskService],
})
export class CategoryTaskModule {}
