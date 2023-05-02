import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [ UserController ],
    providers: [{
        provide: 'UserService',
        useClass: UserService
    }]
})
export class UserModule {}
