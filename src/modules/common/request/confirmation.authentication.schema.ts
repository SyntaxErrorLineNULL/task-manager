/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class ConfirmationAuthenticationSchema {
  @ApiProperty()
  readonly token: string;
}
