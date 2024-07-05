import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Log the hashed password to the console
    console.log('Hashed Password:', hashedPassword);

    // Respond with the hashed password
    res.status(201).json({ 
      message: 'Password hashed successfully!',
      hashedPassword
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = (req, res) => {
  // Handle login logic, such as checking the database and validating credentials
};

export const logout = (req, res) => {
  // Handle logout logic, such as clearing session data
};
