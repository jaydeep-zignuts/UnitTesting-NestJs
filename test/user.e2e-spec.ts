import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Any } from 'typeorm';


describe('UserController (e2e)', () => {
  let app: INestApplication;
  const us = [
    {
      email:"jaydeep00@gmail.com",
      price: 300
    },
    {
      email:"jaydeep00@gmail.com",
      price: 300
    },
    {
      email:"jaydeep00@gmail.com",
      price: 300
    },
    {
      email:"jaydeep00@gmail.com",
      price: 300
    }
  ]
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe)

    await app.init();
  });

  
  // describe('creating a new user post /user/create ', () => {
  //   it('should create a new user in e2e', () => {
  //     return request(app.getHttpServer())
  //     .post('/user/create')
  //     .send({
  //       email:'jaydeep111676@gmail.com',
  //       price: 100,
  //     })
  //     .expect(201)
  //   }); 

  //   it('should return a 400 when invalid email', () => {
  //     return request(app.getHttpServer())
  //     .post('/user/create')
  //     .send({
  //       email: 'affef12222',
  //       price: 100
  //     }).expect(400)
  //   })

  // })
  describe('creturn array of user get /user/getData ', () => {
    const us =it('should return array of users in e2e', () => {
      return request(app.getHttpServer())
      .get('/user/getData')
      .expect(200)
    });
  });
  describe('should  delete user  /user/deleteUser ', () => {
    let user:any;
    it('should create a new user to delete in e2e', () => {
       user = request(app.getHttpServer())
      .post('/user/create')
      .send({
        id:21,
        email:'jaydeep11167600@gmail.com',
        price: 100,
      })
      .expect(201)

      return user;
    }); 
    it('should delete user in e2e', () => {
      return request(app.getHttpServer())
      .delete(`/user/deleteUser/${user["_data"]["id"]}`)
      .expect(200)
    });

  })
  // describe('should update user  /user/updateUser ', () => {
  //    let user:any;
  //   it('should create a new user to update in e2e', () => {
  //      user = request(app.getHttpServer())
  //     .post('/user/create')
  //     .send({
  //       id:21,
  //       email:'jaydeep11167600@gmail.com',
  //       price: 100,
  //     })
  //     .expect(201)

  //     return user;
  //   }); 
  //   it('should update user in e2e', () => {
  //     console.log("hello e2e",user["_data"]["id"]);
  //     return request(app.getHttpServer())
  //     .patch(`/user/updateUser/${user["_data"]["id"]}`)
  //     .send({
  //       email:"jaydeep00Hello@gmail.com",
  //       price: 300
  //     })
  //     .expect(200)
  //   });
  // });

  


  
});
 