import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/smart-tenis'),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
