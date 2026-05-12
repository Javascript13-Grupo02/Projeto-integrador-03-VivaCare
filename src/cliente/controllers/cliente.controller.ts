import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from '../services/cliente.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../usuario/role.enum';

@ApiTags('Clientes')
@Controller('/clientes')
@ApiBearerAuth()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Cliente[]> {
    return this.clienteService.findByNome(nome);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('email') email: string): Promise<Cliente | null> {
    return this.clienteService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  //Mudei o tipo de requisição para que seja necessário mudar apenas algumas partes
  @UseGuards(JwtAuthGuard)
  @Patch()
  @HttpCode(HttpStatus.OK)
  patch(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Admin)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.delete(id);
  }
}
