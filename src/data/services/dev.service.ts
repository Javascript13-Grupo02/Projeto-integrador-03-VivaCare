import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { Cliente } from "../../cliente/entities/cliente.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_vivacare',
            entities: [Apolice, Cliente, Usuario],
            synchronize: true,
    };
  }
}