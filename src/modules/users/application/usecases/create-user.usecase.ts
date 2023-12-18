import { IHash } from "@/modules/users/application/interfaces/hash.interface";
import { IUsersRepository } from "@/modules/users/application/interfaces/users-repository.interface";
import { User } from "@/modules/users/domain/entities/user.entity";
import { UserError } from "@/modules/users/domain/errors/user.error";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly hash: IHash
  ) {}

  public async execute(dto: CreateUserDTO): Promise<User> {
    await this.assertEmailIsUnique(dto.email);

    const passwordHashed = await this.hash.make(dto.password);

    const userCreated = User.create({
      name: dto.name,
      email: dto.email,
      password: passwordHashed,
    })

    await this.usersRepository.create(userCreated);

    return userCreated;
  }

  private async assertEmailIsUnique(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(user) {
      throw UserError.alreadyExists();
    }

    return;
  }
}