import { User } from "@/modules/users/domain/entities/user.entity";
import { describe, expect, it } from "bun:test";
import exp from "constants";

describe("UserEntity", () => {
  it("should create a user", () => {
    const user = User.create({
      name: "any_name",
      email: "any_email",
      password: "any_password"
    })

    expect(user.id).toBeDefined();
    expect(user.name).toBe("any_name");
    expect(user.email).toBe("any_email");
    expect(user.password).toBe("any_password");
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.deletedAt).toBeUndefined();
  })

  it("should update a user", () => {
    const user = User.create({
      name: "any_name",
      email: "any_email",
      password: "any_password"
    })

    const userUpdated = user.update({
      name: "any_name_updated",
      email: "any_email_updated",
      password: "any_password_updated"
    })

    expect(userUpdated.id).toBe(user.id);
    expect(userUpdated.name).toBe("any_name_updated");
    expect(userUpdated.email).toBe("any_email_updated");
    expect(userUpdated.password).toBe("any_password_updated");
    expect(userUpdated.createdAt).toBe(user.createdAt);
    expect(userUpdated.updatedAt).toBeDefined();
    expect(userUpdated.deletedAt).toBeUndefined();
  })
})