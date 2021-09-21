/**
 * Author: SyntaxErrorLineNULL.
 */
import UserEntity from '../../../application/entity/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  public mapper(entity: UserEntity): UserDto {
    return new UserDto(
      entity.id,
      entity.name,
      entity.email,
      entity.createAt.toString(),
      entity.countTaskComplete,
      entity.status,
      entity.role,
    );
  }
}