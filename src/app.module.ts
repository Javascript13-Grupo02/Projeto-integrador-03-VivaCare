import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { ApoliceModule } from './apolice/apolice.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

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
    ClienteModule,
    ApoliceModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
