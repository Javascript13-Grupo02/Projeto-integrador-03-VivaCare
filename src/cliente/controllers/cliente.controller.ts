import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Cliente } from "../entities/cliente.entity";
import { ClienteService } from "../services/cliente.service";

@Controller("/clientes")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Cliente[]> {
    return this.clienteService.findByNome(nome);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('email') email: string): Promise<Cliente | null> {
    return this.clienteService.findByEmail(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
   return this.clienteService.delete(id)
  }

}