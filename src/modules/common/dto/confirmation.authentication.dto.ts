/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';

export class ConfirmationAuthenticationDto {
  @ApiProperty()
  readonly token: string;
}
