# Cashfree Express TypeScript Backend

A minimal backend integration for [Cashfree Payment Gateway](https://www.cashfree.com/) using **Node.js**, **Express**, and **TypeScript**.  
This project demonstrates how to create payment orders via Cashfree's PG API in a secure and type-safe way.

---

## Features

- **Express.js** server with TypeScript for type safety.
- Integration with [cashfree-pg](https://www.npmjs.com/package/cashfree-pg) SDK.
- Environment-based configuration (supports sandbox and production).
- Simple `/create-order` endpoint to create payment orders.
- Well-commented code for easy understanding and extension.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cashfree-express-ts.git
cd cashfree-express-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory (already gitignored):

```
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret
CASHFREE_ENVIRONMENT=sandbox
```

- Use your [Cashfree dashboard](https://merchant.cashfree.com/) to get credentials.
- Set `CASHFREE_ENVIRONMENT` to `sandbox` for testing or `PROD` for production.

### 4. Build and run the server

For development (auto-reloads):

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

---

## API Endpoints

### `POST /create-order`

Creates a new payment order with Cashfree.

**Request Body:**

```json
{
  "orderId": "ORDER123",
  "orderAmount": 100.0,
  "customerDetails": {
    "customer_id": "CUST001",
    "customer_email": "customer@example.com",
    "customer_phone": "9876543210"
  }
}
```

**Response:**

Returns the Cashfree order creation response (see [Cashfree PG Docs](https://docs.cashfree.com/docs/pg-api-overview)).

---

## Project Structure

```
cashfree-express-ts/
├── src/
│   └── index.ts        # Main Express server and Cashfree integration
├── .env.local          # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Notes

- This project is for educational/demo purposes. For production, ensure you handle secrets and errors securely.
- Update the `return_url` in `src/index.ts` as per your frontend or callback requirements.
- Extend the API as needed for your business logic.

---

## License

[ISC](./LICENSE) (or specify your license)

---

## Contributing

Pull requests and issues are welcome!

---

## References

- [Cashfree PG Node SDK](https://www.npmjs.com/package/cashfree-pg)
- [Cashfree Documentation](https://docs.cashfree.com/docs/pg-api-overview)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

