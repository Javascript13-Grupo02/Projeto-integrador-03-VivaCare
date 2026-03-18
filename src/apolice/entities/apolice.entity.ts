import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { NumericTransformer } from "../../util/numerictransformer"
import { Cliente } from "../../cliente/entities/cliente.entity"
import { Usuario } from "../../usuario/entities/usuario.entity"


@Entity({ name: 'tb_apolice' })
export class Apolice {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    plano: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type: 'date', nullable: false})
    data_inicio: Date

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({type: 'date', nullable: false})
    data_fim: Date

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Column()
    dependentes: number

    // Relacionamento com cliente

    // Relacionamento com usuário

    @ManyToOne(() => Cliente, (cliente) => cliente.apolice, {
        onDelete: "CASCADE"
    })
    cliente: Cliente

    @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
}