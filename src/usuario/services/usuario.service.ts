import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    // Não vai ter um endpoint na Controller para ser consumido, será usado apenas na autenticação
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findByUsuarioController(usuario: string): Promise<Usuario> {
       const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: { usuario: usuario },
              relations: {
                apolice: true
            }
        });

        if (!usuarioEncontrado) {
            throw new HttpException(`Usuario ${usuario} não encontrado!`, HttpStatus.NOT_FOUND);
        }

         return usuarioEncontrado;
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                apolice: true
            }
        });
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                apolice: true
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

    
    // Deletar condicional à quem está deletando ser 'admin' e quem está sendo deletado ser 'user'.
    // Se o usuário a ser deletado for um 'admin' a função retorna uma exception.
    async delete(id: number): Promise<DeleteResult> {
            
            const usuario = await this.findById(id);

            if(usuario.roles === 'admin'){
                throw new HttpException('Você não tem autorização para deletar esse usuário', HttpStatus.FORBIDDEN);
            }
    
            return await this.usuarioRepository.delete(id);
    
        }
}