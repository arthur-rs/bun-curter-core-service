import { IHash } from "@/modules/users/application/interfaces/hash.interface";
import { ITokenization } from "@/modules/users/application/interfaces/tokenization.interface";
import { IUsersRepository } from "@/modules/users/application/interfaces/users-repository.interface";
import { UserError } from "@/modules/users/domain/errors/user.error";

export interface CreateSessionDTO {
  email: string;
  password: string;
}

export class CreateSessionUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly tokenization: ITokenization,
    private readonly hash: IHash,
  ) {}

  public async execute(dto: CreateSessionDTO): Promise<string> {
    const user = await this.usersRepository.findByEmail(dto.email);

    if(!user) {
      throw UserError.authenticationFailed();
    }

    const passwordMatch = await this.hash.compare(dto.password, user.password);

    if(!passwordMatch) {
      throw UserError.authenticationFailed();
    }

    const token = await this.tokenization.generateToken({
      name: user.name,
      userId: user.id,
      claims: {
        email: user.email,
        mobilePhone: user.mobilePhone,
        ...user.claims
      }
    });

    return token;
  }
}