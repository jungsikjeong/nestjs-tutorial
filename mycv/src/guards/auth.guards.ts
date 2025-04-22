import { ExecutionContext } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";



export class AuthGuard implements CanActivate {
    // request가아닌 ExecutionContext를 쓰는 이유는 여러 통신 프로토콜에서도 사용될 수 있기 때문
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        return request.session.userId;
    }
}


