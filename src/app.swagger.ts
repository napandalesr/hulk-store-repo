import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export const initSwagger = (app: INestApplication) =>{
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentación')
  .setDescription('Documentación para prueba Front')
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}