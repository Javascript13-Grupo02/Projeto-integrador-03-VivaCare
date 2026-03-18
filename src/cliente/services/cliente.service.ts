import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "../entities/cliente.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { differenceInYears } from "date-fns";

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>
    ) { }

    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            relations:{
                apolice: true
            }
        });
    }

    async findById(id: number): Promise<Cliente> {

        const cliente = await this.clienteRepository.findOne({
            where: {
                id
            },
            relations:{
                apolice: true
            }
        });

        if (!cliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return cliente;
            
    }

    async findByNome(nome: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                apolice: true
            }
        })
    }

    async findByEmail(email: string): Promise<Cliente> {
        let resultado = await this.clienteRepository.findOne({
            where: {
                email: ILike(`%${email}%`)
            },
            relations:{
                apolice: true
            }
        })

        if(!resultado) 

          throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);
        
        return resultado
    }

    async create(cliente: Cliente): Promise<Cliente> {

        const data = new Date();
        const idade = differenceInYears(data, cliente.data_nascimento);

        if(idade < 18)
            throw new HttpException("Para contratar uma apólice é preciso ser maior de idade.", HttpStatus.BAD_REQUEST);

        const buscaCliente = await this.clienteRepository.findOne({
          where: {
            email: ILike(`%${cliente.email}%`)
        }
        });

        if (buscaCliente) {

          throw new HttpException("O Cliente já existe!", HttpStatus.BAD_REQUEST);
        }

        return await this.clienteRepository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        
        await this.findById(cliente.id);

        const buscaCliente = await this.findByEmail(cliente.email);

        if (buscaCliente && buscaCliente.id !== cliente.id)
            throw new HttpException('Cliente (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        const data = new Date();
        const idade = differenceInYears(data, cliente.data_nascimento);

        if(idade < 18)
            throw new HttpException("Não é possível atualizar o cadastro: idade inferior a 18 anos.", HttpStatus.BAD_REQUEST);
        
        return await this.clienteRepository.save(cliente);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);

        return await this.clienteRepository.delete(id);

    }

}