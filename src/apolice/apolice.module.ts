import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteModule } from "../cliente/cliente.module";
import { ApoliceController } from "./controllers/apolice.controller";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";

@Module({
    imports: [TypeOrmModule.forFeature([Apolice]), ClienteModule],
    providers: [ApoliceService],
    controllers: [ApoliceController],
    exports: []
})
export class ApoliceModule {}