/**
 * Author: SyntaxErrorLineNULL.
 */
import { User } from '../../user/entity/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  public mapper(entity: User): UserDto {
    return new UserDto(entity.id, entity.name, entity.email, entity.createAt.toString(), entity.status, entity.role);
  }
}
