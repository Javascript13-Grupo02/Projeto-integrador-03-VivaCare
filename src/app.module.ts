import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { ApoliceModule } from './apolice/apolice.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),

    ClienteModule,
    ApoliceModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
