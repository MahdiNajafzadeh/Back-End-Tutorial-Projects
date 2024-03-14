import { Router } from "express";
import users from "./controller/users";
import bodyValidation from "./middleware/users/body.validation";

const router = Router();

router.use(bodyValidation);
router.post("/user/signup", users.signup);
router.post("/user/login", users.login);
router.delete("/user/logout", users.logout);
router.get("/user/info", users.info.get);
router.put("/user/info", users.info.edit);

export default router;
