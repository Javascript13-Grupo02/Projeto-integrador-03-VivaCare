import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NumericTransformer } from '../../util/numerictransformer';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_apolice' })
export class Apolice {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  plano: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  @ApiProperty()
  preco: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  data_inicio: Date;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  data_fim: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Column()
  dependentes: number;

  // Relacionamento com cliente

  // Relacionamento com usuário

  @ApiProperty({ type: () => Cliente })
  @ManyToOne(() => Cliente, (cliente) => cliente.apolice, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
