import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/auth.js";
import { createUser, findUserByEmail, findUserById } from "../store/users.js";
import { fail, ok } from "../utils/response.js";

const authRouter = Router();

const cookieConfig = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

const sanitizeUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    organizationName: user.organizationName,
  };
};

const issueSession = (res, user) => {
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, cookieConfig);
  return token;
};

authRouter.post("/register", async (req, res) => {
  const { name, email, password, role = "volunteer", organizationName } = req.body || {};

  if (!name || !email || !password) {
    return fail(res, "Name, email, and password are required.");
  }

  if (!["volunteer", "ngo", "admin"].includes(role)) {
    return fail(res, "Invalid role.");
  }

  if (role === "ngo" && !organizationName) {
    return fail(res, "Organization name is required for NGO accounts.");
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return fail(res, "Email already registered.", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    passwordHash,
    role,
    organizationName,
  });

  const token = issueSession(res, user);
  return ok(res, { user: sanitizeUser(user), token }, 201);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return fail(res, "Email and password are required.");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return fail(res, "Invalid credentials.", 401);
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    return fail(res, "Invalid credentials.", 401);
  }

  const token = issueSession(res, user);
  return ok(res, { user: sanitizeUser(user), token });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", cookieConfig);
  return ok(res, { message: "Logged out." });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await findUserById(req.auth.sub);
  if (!user) {
    return fail(res, "Unauthorized", 401);
  }

  return ok(res, { user: sanitizeUser(user) });
});

export default authRouter;
