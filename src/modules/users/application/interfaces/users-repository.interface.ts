import { User } from "@/modules/users/domain/entities/user.entity";

export abstract class IUsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}