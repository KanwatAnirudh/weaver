import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
  if (!user) return null;
  return { 
    id: user._id.toString(), 
    name: user.name, 
    email: user.email, 
    role: user.role, 
    organizationName: user.organizationName, 
    passwordHash: user.passwordHash 
  };
};

export const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) return null;
    return { 
      id: user._id.toString(), 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      organizationName: user.organizationName 
    };
  } catch (err) {
    return null;
  }
};

export const createUser = async ({ name, email, passwordHash, role, organizationName }) => {
  const user = new User({ 
    name, 
    email: email.toLowerCase(), 
    passwordHash, 
    role, 
    organizationName: organizationName || null 
  });
  await user.save();
  return { 
    id: user._id.toString(), 
    name: user.name, 
    email: user.email, 
    role: user.role, 
    organizationName: user.organizationName 
  };
};
