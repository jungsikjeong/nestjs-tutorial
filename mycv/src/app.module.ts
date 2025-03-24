import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true, // 절대 운영환경에서는 안됌, 개발 환경 전용으로 TypeORM이 모든 엔터티 구조를 살펴본 후에 자동으로 데이터베이스 구조를 업데이트해줌, 테이블을 생성하고 삭제 및 열 추가 삭제, 이 열에 저장된 데이터 타입을 변경하기도함
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
