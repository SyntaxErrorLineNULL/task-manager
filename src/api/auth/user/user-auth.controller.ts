/**
 * Author: SyntaxErrorLineNULL.
 */
import { Controller } from '@nestjs/common';
import { GuardService } from '../../../components/guard/service/guard.service';

@Controller('api/user-auth')
export class UserAuthController {
  constructor(private guardService: GuardService) {}
}
