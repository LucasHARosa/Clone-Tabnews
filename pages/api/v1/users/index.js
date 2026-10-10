import controller from "@/infra/controller.js";
import { createRouter } from "next-connect";
import user from "@/models/user.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandler);

async function postHandler(req, res) {
  const userInputValues = req.body;
  const createdUser = await user.create(userInputValues);
  res.status(201).json(createdUser);
}
