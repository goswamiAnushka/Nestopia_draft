import bcrypt from 'bcryptjs';
import  prisma  from '../lib/prisma.js';


export const register = async (req, res) => {
  const { username, email, password } = req.body;

  
  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = (req, res) => {
  // Handle login logic, such as checking the database and validating credentials
};

export const logout = (req, res) => {
  // Handle logout logic, such as clearing session data
};
