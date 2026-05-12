import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { ApoliceService } from '../services/apolice.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../usuario/role.enum';
import { RolesGuard } from '../../auth/guard/roles.guard';

@ApiTags('Apolices')
@UseGuards(JwtAuthGuard)
@Controller('/apolices')
@ApiBearerAuth()
export class ApoliceController {
  constructor(private readonly apoliceService: ApoliceService) {}

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Apolice[]> {
    return this.apoliceService.findAll();
  }

 
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Apolice> {
    return this.apoliceService.findById(id);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get('/plano/:plano')
  @HttpCode(HttpStatus.OK)
  findByPlano(@Param('plano') plano: string): Promise<Apolice[]> {
    return this.apoliceService.findByPlano(plano);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get('/preco_maior/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMaior(@Param('preco') preco: number): Promise<Apolice[]> {
    return this.apoliceService.findByPrecoMaior(preco);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Get('/preco_menor/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMenor(@Param('preco') preco: number): Promise<Apolice[]> {
    return this.apoliceService.findByPrecoMenor(preco);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.create(apolice);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin, Role.Corretor)
  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.update(apolice);
  }

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.apoliceService.delete(id);
  }
}
