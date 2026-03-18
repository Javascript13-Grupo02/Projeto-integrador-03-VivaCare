import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_vivacare',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ClienteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
