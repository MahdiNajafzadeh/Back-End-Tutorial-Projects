import { Router } from "express";
import users from "./handlers/users";
import bodyValidation from "./middleware/users/body.validation";

const router = Router();

router.use(bodyValidation);
router.post("/user/signup", users.signup);
router.post("/user/login", users.login);
router.delete("/user/logout", users.logout);
router.get("/user/info");
router.put("/user/info");

export default router;
