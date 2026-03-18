import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  usuario: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ApiProperty()
  @OneToMany(() => Apolice, (apolice) => apolice.usuario)
  apolice: Apolice[];
}
