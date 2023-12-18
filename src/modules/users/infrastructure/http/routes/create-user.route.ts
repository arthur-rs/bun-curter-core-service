import { CreateUserUseCase } from "@/modules/users/application/usecases/create-user.usecase";
import { UserError } from "@/modules/users/domain/errors/user.error";
import { InMemoryUsersRepository } from "@/modules/users/infrastructure/db/in-memory/in-memory.users-repository";
import { Argon2Hash } from "@/modules/users/infrastructure/hash/argon2/argon2.hash";
import Elysia, { t } from "elysia";

export const createUserRoute = new Elysia().post("/api/users", async (req) => {
  const { name, email, password } = req.body;

  const hash = Argon2Hash.getInstance()

  const usersRepository = InMemoryUsersRepository.getInstance()

  const usecase = new CreateUserUseCase(usersRepository, hash)

  const user = await usecase.execute({ name, email, password })

  return {
    success: true,
    data: user
  }
}, {
  body: t.Object({
    name: t.String(),
    email: t.String({ format: 'email' }),
    password: t.String({
      minLength: 6,
      maxLength: 20,
      pattern: "^[a-zA-Z0-9]+$"
    }),
  })
})