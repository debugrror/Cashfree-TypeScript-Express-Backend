import express, { Request, Response } from 'express';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import dotenv from 'dotenv';

// Load environment variables from .env/.env.local files
dotenv.config();

// Ensure required Cashfree credentials are present
if (!process.env.CASHFREE_CLIENT_ID || !process.env.CASHFREE_CLIENT_SECRET) {
  throw new Error('Missing Cashfree credentials in environment variables');
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize Cashfree SDK with environment variables
// Uses SANDBOX by default unless CASHFREE_ENV is set to 'PROD'
const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === 'PROD' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID!,
  process.env.CASHFREE_CLIENT_SECRET!
);

// Root route for health check or welcome message
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript + Cashfree!');
});

// Route to create a payment order using Cashfree PG
app.post('/create-order', async (req: Request, res: Response) => {
  try {
    // Expecting orderId, orderAmount, and customerDetails in request body
    const { orderId, orderAmount, customerDetails } = req.body;

    // Prepare payload as per Cashfree PG API requirements
    const orderPayload = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: customerDetails,
      order_note: 'Test order',
      return_url: 'http://localhost:3000/return', // Update as needed
    };

    // Create order using Cashfree SDK
    const response = await cashfree.PGCreateOrder(orderPayload);

    // Send Cashfree API response back to client
    res.json(response.data);
  } catch (error) {
    // Log and handle errors gracefully
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
