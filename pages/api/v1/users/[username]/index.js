import controller from "@/infra/controller.js";
import { createRouter } from "next-connect";
import user from "@/models/user.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandler);

async function getHandler(req, res) {
  const { username } = req.query;
  const foundUser = await user.findUniqueByUsername({ where: { username } });
  res.status(200).json(foundUser);
}
