/**
 * Author: SyntaxErrorLineNULL.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendUrlGeneratorService {
  constructor(private host: string) {}

  public build(pathFile: string): string {
    return this.host + pathFile;
  }
}
