import { plainToInstance, ClassConstructor } from 'class-transformer';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => {
  console.log('Original object, with correct ID----------------------------------', plainObject)
  const obj = plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
  console.log('Changed object, with wrong ID----------------------------------------', obj);
  return obj;
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        authDatabase: configService.get<string>('database.authBase'),
        databaseName: configService.get<string>('database.name'),
      }),
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    inject: [ConfigService]
  }
}
