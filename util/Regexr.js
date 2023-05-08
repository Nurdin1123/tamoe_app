const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+62|62|0)8[0-9]{6,11}$/;

module.exports.validateInput = (req, res, next) => {
  const { email, phone_number } = req.body;
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email tidak valid' });
  }
  
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({ message: 'Phone tidak valid' });
  }
  
  next();
};

