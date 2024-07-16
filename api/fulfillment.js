const express = require('express');
const bodyParser = require('body-parser');
const prisma = require('./prisma');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const propertyId = req.body.queryResult.parameters.propertyId;

  if (intentName === 'GetPropertyDetails') {
    try {
      const property = await prisma.post.findUnique({
        where: { id: propertyId },
        include: { postDetail: true }
      });

      if (property) {
        const { title, price, address, city, bedroom, bathroom, property: propertyType, postDetail } = property;
        const { desc, utilities, pet, income, size, school, bus, restaurant } = postDetail || {};

        res.json({
          fulfillmentText: `Property details:
          Title: ${title}
          Price: ${price}
          Address: ${address}, ${city}
          Bedrooms: ${bedroom}
          Bathrooms: ${bathroom}
          Type: ${propertyType}
          Description: ${desc}
          Utilities: ${utilities}
          Pet Friendly: ${pet}
          Income Requirement: ${income}
          Size: ${size} sqft
          Nearby Schools: ${school}
          Nearby Bus Stops: ${bus}
          Nearby Restaurants: ${restaurant}`
        });
      } else {
        res.json({
          fulfillmentText: `No property found with ID: ${propertyId}`
        });
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
      res.json({
        fulfillmentText: 'Error fetching property details'
      });
    }
  }
});

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
