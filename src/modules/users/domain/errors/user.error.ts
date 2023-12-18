import { DomainError } from "@/common/domain/errors/domain.error";

export class UserError extends DomainError {

  public static alreadyExists(): UserError {
    return new UserError(
      'user_already_exists',
      'User already exists',
      400,
      {}
    )
  }

  static authenticationFailed() {
    throw new UserError(
      'authentication_failed',
      'Authentication failed',
      401,
      {}
    )
  }
}