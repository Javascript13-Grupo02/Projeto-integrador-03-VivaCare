import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('VivaCare')
    .setDescription(
      'O VivaCare é uma solução digital desenvolvida para descomplicar a gestão de seguros de vida. O foco do projeto é substituir a burocracia e as "letras miúdas" por uma experiência fluida e intuitiva, permitindo que, os usuários (corretores) gerenciem os planos de cobertura com eficiência.',
    )
    .setContact(
      'AllCare',
      'https://www.instagram.com/_allcare',
      'allcare@email.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
