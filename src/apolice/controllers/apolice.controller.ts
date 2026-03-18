import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Apolice } from "../entities/apolice.entity";
import { ApoliceService } from "../services/apolice.service";


@Controller("/apolices")
export class ApoliceController {
  constructor(private readonly apoliceService: ApoliceService) { }

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

  @Get('/plano/:plano')
  @HttpCode(HttpStatus.OK)
  findByPlano(@Param('plano') plano: string): Promise<Apolice[]> {
    return this.apoliceService.findByPlano(plano);
  }

  @Get('/preco_maior/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMaior(@Param('preco') preco: number): Promise<Apolice[]> {
    return this.apoliceService.findByPrecoMaior(preco);
  }

  @Get('/preco_menor/:preco')
  @HttpCode(HttpStatus.OK)
  findByPrecoMenor(@Param('preco') preco: number): Promise<Apolice[]> {
    return this.apoliceService.findByPrecoMenor(preco);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.create(apolice);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.update(apolice);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.apoliceService.delete(id);
  }

}