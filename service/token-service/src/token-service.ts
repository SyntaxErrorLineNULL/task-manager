/**
 * Author: SyntaxErrorLineNULL.
 */

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
}
