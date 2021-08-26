import { TypeOrmModule } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'app',
  password: 'secret',
  database: 'app',
  entities: ['dist/**/*.entity{.ts}'],
  synchronize: true,
};
