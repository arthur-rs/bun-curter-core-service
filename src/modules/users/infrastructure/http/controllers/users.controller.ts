import Elysia from "elysia";

import { createUserRoute } from "@/modules/users/infrastructure/http/routes/create-user.route";
import { UserError } from "@/modules/users/domain/errors/user.error";

export const usersController = new Elysia()
  .use(createUserRoute)
  .onError((req) => {
    const error = req.error as Error

    if(error instanceof UserError) {
      return {
        success: false,
        error: {
          code: error.code,
          description: error.description,
          errors: error.errors
        }
      }
    }

    return {
      success: false,
      error: {
        code: "internal_server_error",
        description: error.message
      }
    }
  })