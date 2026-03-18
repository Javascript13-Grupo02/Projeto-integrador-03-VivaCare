import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, LessThan, Like, MoreThan, Repository } from "typeorm";
import { Apolice } from "../entities/apolice.entity";
import { ClienteService } from "../../cliente/services/cliente.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ApoliceService {
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>,
        private clienteService: ClienteService
    ) { }

    async findAll(): Promise<Apolice[]> {
        return await this.apoliceRepository.find(
            {
                relations: {
                    cliente: true
                }
            }
        );
    }

    async findById(id: number): Promise<Apolice> {

        let apolice = await this.apoliceRepository.findOne({
            where: {
                id
            },
            relations: {
                cliente: true
            }
        });

        if (!apolice)
            throw new HttpException('Apolice não encontrada!', HttpStatus.NOT_FOUND);

        return apolice;

    }

    async findByPlano(plano: string): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                plano: Like(`%${plano}%`)
            },
            relations: {
                cliente: true
            }
        })
    }

    async create(apolice: Apolice): Promise<Apolice> {

        await this.clienteService.findById(apolice.cliente.id)

        return await this.apoliceRepository.save(apolice);

    }

    async update(apolice: Apolice): Promise<Apolice> {

        await this.findById(apolice.id);

        await this.clienteService.findById(apolice.cliente.id)

        return await this.apoliceRepository.save(apolice);

    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.apoliceRepository.delete(id);

    }

    async findByPrecoMaior(preco: number): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                preco: MoreThan(preco)
            },
            order: {
                preco: 'ASC'
            },
            relations: {
                cliente: true
            }
        })
    }

    async findByPrecoMenor(preco: number): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                preco: 'DESC'
            },
            relations: {
                cliente: true
            }
        })
    }

}