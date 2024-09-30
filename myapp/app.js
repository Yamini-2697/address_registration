const express = require('express');
const bodyParser = require('body-parser');
const { User, Address } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create user with address
app.post('/users', async (req, res) => {
  const { name, street, city, state, zipCode } = req.body;
  
  try {
    // Create a new user
    const user = await User.create({ name });
    
    // Create the associated address
    const address = await Address.create({
      street,
      city,
      state,
      zipCode,
      UserId: user.id,
    });

    res.status(201).json({
      message: 'User and address created successfully',
      user,
      address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch user with addresses
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Address, as: 'addresses' }],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
