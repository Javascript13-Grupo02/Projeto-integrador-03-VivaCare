import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";

@Entity({name: 'tb_clientes'})
export class Cliente {

  @PrimaryGeneratedColumn()
  id: number

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({length: 100, nullable: false})
  nome: string

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsEmail()
  @Column({length: 100, nullable: false})
  email: string

  @Transform(({value}: TransformFnParams) => value?.trim())
  @IsMobilePhone(
  'pt-BR',
  { strictMode: true },
  {
    message: 'Número de telefone inválido!',
  })
  @Column({length: 50, nullable: false})
  telefone: string

  @IsNotEmpty()
  @Column({type: 'date', nullable: false})
  data_nascimento: Date

  @Column({length: 255, nullable: false})
  foto: string
  
  // relacionamento com apolice

  @OneToMany(() => Apolice, (apolice) => apolice.cliente)
  apolice: Apolice[];

}