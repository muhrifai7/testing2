import { Router } from "express";

import {
  list,
  create,
  show,
  destroy,
  edit,
  edit_me,
  show_by_id,
} from "../../controllers/users";
import { checkJwt } from "../../middleware/checkJwt";
import { checkRole } from "../../middleware/checkRole";
import { validatorEdit } from "../../middleware/validation/users";

const router = Router();

router.get("/", list);

router.post("/", create);

router.get(
  "/me",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
  ],
  show
);

router.get(
  "/:id([0-9]+)",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
  ],
  show_by_id
);

router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMINISTRATOR"], true), validatorEdit],
  edit
);

router.patch(
  "/me",
  [
    checkJwt,
    checkRole(["ADMINISTRATOR", "STANDARD", "MANAGER", "STAFF"], true),
    validatorEdit,
  ],
  edit_me
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  destroy
);

export default router;
