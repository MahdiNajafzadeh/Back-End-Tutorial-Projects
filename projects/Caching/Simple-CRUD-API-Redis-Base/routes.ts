import { Router } from "express";

import person from "./controller/person";

const router = Router();

router.get("/api/person", person.get.all);
router.get("/api/person/:id", person.get.one);
router.post("/api/person", person.create);
router.put("/api/person/:id", person.update);
router.delete("/api/person/:id", person.delete);

export default router;
