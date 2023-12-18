import { IUsersRepository } from "@/modules/users/application/interfaces/users-repository.interface";
import { User } from "@/modules/users/domain/entities/user.entity";

export class InMemoryUsersRepository extends IUsersRepository {

  private static instance: InMemoryUsersRepository;

  constructor(
    private readonly users: User[] = []
  ) {
    super();
  }
  
  public static getInstance(): InMemoryUsersRepository {
    if(!InMemoryUsersRepository.instance) {
      InMemoryUsersRepository.instance = new InMemoryUsersRepository();
    }

    return InMemoryUsersRepository.instance;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}