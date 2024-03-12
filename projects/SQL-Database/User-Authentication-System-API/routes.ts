import { Router } from "express";
import users from "./handlers/users.ts";
import validator from "./middleware/schema.validation";

const router = Router();

router.post("/user/signup", validator, users.signup);
router.post("/user/login", validator, users.login);
router.delete("/user/logout", users.logout);
router.get("/user/info");
router.put("/user/info");

export default router;
