import { Router } from "express";

import auth from "./auth";
import users from "./users";
import role from "./role";
import department from "./department";
import attendance from "./attendance";
import salaries from "./salaries";
import userTax from "./userTax";
import payroll from "./payroll";

const router = Router();

router.use("/auth", auth);
router.use("/user", users);
router.use("/role", role);
router.use("/department", department);
router.use("/attendance", attendance);
router.use("/salaries", salaries);
router.use("/user_tax", userTax);
router.use("/payroll", payroll);

export default router;
