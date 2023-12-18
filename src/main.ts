import Elysia from "elysia";

import { usersController } from "@/modules/users/infrastructure/http/controllers/users.controller";

const app = new Elysia()
  .use(usersController)

app.listen(3333)