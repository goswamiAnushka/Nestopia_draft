import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save to db
    // Assuming you have a User model and using Mongoose for MongoDB
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = (req, res) => {
  // Handle login logic, such as checking the database and validating credentials
};

export const logout = (req, res) => {
  // Handle logout logic, such as clearing session data
};
