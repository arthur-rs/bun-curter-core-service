import { describe, it, mock, jest, expect } from "bun:test";

import { IUsersRepository } from "@/modules/users/application/interfaces/users-repository.interface";
import { IHash } from "@/modules/users/application/interfaces/hash.interface";

import { CreateUserUseCase } from "@/modules/users/application/usecases/create-user.usecase";
import { UserError } from "@/modules/users/domain/errors/user.error";

function makeSut() {
  const usersRepositoryMock = mock<() => IUsersRepository>(() => ({
    create: jest.fn(),
    findByEmail: jest.fn()
  }))();

  const hashRepositoryMock = mock<() => IHash>(() => ({
    make: jest.fn(),
    compare: jest.fn()
  }))();

  const sut = new CreateUserUseCase(
    usersRepositoryMock,
    hashRepositoryMock
  );

  return {
    sut,
    usersRepositoryMock,
    hashRepositoryMock
  }
}

describe("CreateUserUseCase", () => {
  it("should create a user", async () => {
    const { sut, usersRepositoryMock, hashRepositoryMock } = makeSut();

    const user = {
      name: "any_name",
      email: "any_email",
      password: "any_password"
    }

    const passwordHashed = "any_hashed_password";

    (usersRepositoryMock.findByEmail as jest.Mock).mockResolvedValueOnce(null);

    (hashRepositoryMock.make as jest.Mock).mockResolvedValueOnce(passwordHashed);

    await sut.execute(user);

    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      id: expect.any(String),
      props: {
        name: user.name,
        email: user.email,
        password: passwordHashed
      }
    })

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(user.email);

    expect(hashRepositoryMock.make).toHaveBeenCalledWith(user.password);
  })

  it("should throw an error if user already exists", async () => {
    const { sut, usersRepositoryMock } = makeSut();

    const user = {
      name: "any_name",
      email: "any_email",
      password: "any_password"
    };

    (usersRepositoryMock.findByEmail as jest.Mock).mockResolvedValueOnce(jest.fn());

    expect(sut.execute(user)).rejects.toThrow(UserError.alreadyExists());
  })
})