# Shared Inbox and Order Capture

A lightweight social-commerce operations system for small online sellers who receive orders through Facebook, Instagram, Telegram, TikTok, and other chat channels.

The goal is simple:

> Turn customer messages into structured orders faster.

This product is designed for small Cambodian online businesses, especially fashion and clothing sellers, where most sales happen through inbox/chat instead of a traditional e-commerce website.

---

## Overview

Many small sellers post products on social platforms, then customers message them to ask about price, size, stock, payment, and delivery.

Without a proper system, sellers usually manage everything manually:

- Replying to the same questions again and again
- Copying customer details from chat into notes or spreadsheets
- Checking product size and stock manually
- Tracking payment screenshots manually
- Sending delivery details to couriers manually
- Searching old chats to find customer history

**Shared Inbox and Order Capture** solves this by combining inbox management, customer profiles, order creation, payment tracking, and delivery status into one workflow.

---

## Core Workflow

```txt
Post Product
   ↓
Customer Inbox / DM
   ↓
Shared Inbox
   ↓
Quick Reply
   ↓
Create Draft Order
   ↓
Confirm Product, Size, Color, Quantity
   ↓
Collect Customer Info
   ↓
Track Payment
   ↓
Prepare Delivery
   ↓
Mark Delivered
   ↓
Save Customer History
```

---

## Main Features

### Shared Inbox

Manage customer conversations from multiple sales channels in one place.

- Conversation list
- Channel source tracking
- Unread message status
- Customer profile panel
- Internal notes
- Staff assignment
- Conversation status

Supported or planned channels:

- Facebook Messenger
- Instagram DM
- Telegram
- TikTok manual source tracking
- Phone / walk-in manual order

---

### Order Capture

Create structured orders directly from customer conversations.

- Create draft order from chat
- Select product
- Select size, color, and quantity
- Add customer name and phone number
- Add delivery address
- Calculate subtotal, delivery fee, and total amount
- Track order status
- Link order to customer conversation

Order statuses:

- Draft
- Confirmed
- Awaiting Payment
- Paid
- Packing
- Shipped
- Delivered
- Cancelled
- Returned / Exchanged

---

### Product Catalog

Simple product management for social sellers.

- Product name
- Product code / SKU
- Product image
- Category
- Price
- Size variants
- Color variants
- Stock quantity
- Active / inactive status

---

### Customer Profile

Save useful customer history automatically.

- Customer name
- Phone number
- Social channel
- Saved addresses
- Previous orders
- Internal notes
- Customer tags
- Total orders
- Total spend

Example tags:

- VIP
- New Customer
- Repeat Customer
- Payment Pending
- Province Customer
- Exchange Requested

---

### Payment Tracking

Track customer payment status without losing context.

- Payment method
- Payment status
- Payment screenshot
- Transaction reference
- Payment notes

Payment methods:

- ABA
- KHQR
- Wing
- Bank Transfer
- Cash on Delivery
- Other

Payment statuses:

- Unpaid
- Deposit Paid
- Fully Paid
- Refunded

---

### Delivery Tracking

Prepare and track delivery information.

- Recipient name
- Phone number
- Province / city
- District / commune
- Address
- Landmark
- Delivery company
- Delivery fee
- Tracking number
- Delivery note

Delivery statuses:

- Not Ready
- Ready to Ship
- Sent to Courier
- In Transit
- Delivered
- Failed Delivery
- Returned

---

### Quick Replies

Reusable reply templates for common customer questions.

Examples:

- Price inquiry
- Size availability
- Stock availability
- Delivery fee
- Payment instruction
- Order confirmation
- Out-of-stock message
- Follow-up message
- Thank-you message
- Exchange policy

---

## Target Users

This system is built for:

- Solo online sellers
- Small clothing brands
- Facebook Page sellers
- Telegram sellers
- Instagram shops
- TikTok sellers
- Small teams with 2–8 staff
- Sellers who still use Google Sheets or notebooks to track orders

---

## MVP Scope

The first version focuses on the most important workflow:

> Inbox → Quick Reply → Draft Order → Payment Status → Delivery Status → Export

### MVP Features

- User authentication
- Business workspace
- Shared inbox UI
- Manual conversation creation
- Telegram bot capture
- Customer profile
- Product catalog
- Quick replies
- Create order from conversation
- Order list
- Payment status tracking
- Delivery status tracking
- CSV / Google Sheets export
- Basic dashboard

### Not Included in MVP

- Full AI chatbot
- Full POS system
- Full accounting system
- Full warehouse system
- Full TikTok DM automation
- Full courier booking automation
- Advanced CRM campaigns

---

## Suggested Tech Stack

This section can be adjusted based on the final implementation.

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- NestJS or Next.js API routes
- TypeScript
- REST API or tRPC

### Database

- PostgreSQL
- Supabase or Prisma

### Authentication

- Clerk
- Supabase Auth
- NextAuth

### Storage

- Supabase Storage
- S3-compatible storage

### Integrations

- Facebook Messenger API
- Instagram Messaging API
- Telegram Bot API
- Google Sheets API
- Payment provider API
- Delivery provider API

---

## Example Use Case

Nika sells clothing online.

1. Nika posts a new dress on Facebook and Instagram.
2. A customer messages: “Bong, size M available?”
3. The message appears in the shared inbox.
4. Staff opens the conversation.
5. Staff uses a quick reply to answer.
6. Customer chooses size M and black color.
7. Staff clicks **Create Order**.
8. Staff selects the product, size, color, and quantity.
9. System calculates the total amount.
10. Staff collects name, phone, and delivery address.
11. Customer sends payment screenshot.
12. Staff marks the order as paid.
13. Packing staff sees the order as ready to ship.
14. Delivery status is updated.
15. Customer history is saved for future orders.

---

## Project Structure

Example structure:

```txt
shared-inbox-order-capture/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   └── public/
│   │
│   └── api/
│       ├── src/
│       ├── modules/
│       ├── common/
│       └── main.ts
│
├── packages/
│   ├── database/
│   ├── shared/
│   ├── ui/
│   └── config/
│
├── docs/
│   ├── PRD.md
│   ├── API.md
│   └── DATABASE.md
│
├── .env.example
├── package.json
├── README.md
└── turbo.json
```

---

## Main Modules

### Inbox Module

Responsible for:

- Conversations
- Messages
- Channel source
- Assignment
- Internal notes
- Conversation status

### Order Module

Responsible for:

- Draft orders
- Confirmed orders
- Order items
- Payment status
- Delivery status
- Order timeline

### Product Module

Responsible for:

- Product catalog
- SKU
- Product images
- Size variants
- Color variants
- Stock quantity

### Customer Module

Responsible for:

- Customer profile
- Addresses
- Tags
- Notes
- Order history

### Team Module

Responsible for:

- Business users
- Staff roles
- Permissions
- Assignment

### Integration Module

Responsible for:

- Facebook Messenger
- Instagram DM
- Telegram Bot
- Google Sheets
- Payment providers
- Delivery providers

---

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
# App
APP_NAME="Shared Inbox and Order Capture"
APP_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shared_inbox"

# Auth
AUTH_SECRET="your-auth-secret"

# Storage
STORAGE_BUCKET="uploads"

# Facebook / Meta
META_APP_ID=""
META_APP_SECRET=""
META_VERIFY_TOKEN=""
META_PAGE_ACCESS_TOKEN=""

# Instagram
INSTAGRAM_ACCESS_TOKEN=""

# Telegram
TELEGRAM_BOT_TOKEN=""

# Google Sheets
GOOGLE_CLIENT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_SHEET_ID=""

# Payment
PAYMENT_PROVIDER_API_KEY=""

# Delivery
DELIVERY_PROVIDER_API_KEY=""
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shared-inbox-order-capture.git
cd shared-inbox-order-capture
```

### 2. Install Dependencies

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### 3. Setup Environment

```bash
cp .env.example .env
```

Update the `.env` values based on your local setup.

### 4. Run Database Migration

```bash
npm run db:migrate
```

Or:

```bash
pnpm db:migrate
```

### 5. Start Development Server

```bash
npm run dev
```

Or:

```bash
pnpm dev
```

---

## Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Build the application.

```bash
npm run start
```

Start production server.

```bash
npm run lint
```

Run lint checks.

```bash
npm run format
```

Format code.

```bash
npm run test
```

Run tests.

```bash
npm run db:migrate
```

Run database migrations.

```bash
npm run db:studio
```

Open database studio.

---

## Data Models

Core entities:

- Business
- User
- Conversation
- Message
- Customer
- Product
- Product Variant
- Order
- Order Item
- Payment
- Delivery
- Quick Reply
- Activity Log

---

## Roadmap

### Phase 1: MVP

- Shared inbox UI
- Manual conversation capture
- Telegram bot capture
- Customer profile
- Product catalog
- Quick replies
- Draft order creation
- Payment status tracking
- Delivery status tracking
- Order list
- Basic dashboard
- CSV / Google Sheets export

### Phase 2: Team Operations

- Staff assignment
- Role permissions
- Internal notes
- Stock reservation
- Product import from Google Sheets
- Customer tags
- Payment screenshot management
- Delivery list export
- Response time tracking

### Phase 3: Automation

- Messenger integration
- Instagram DM integration
- Payment link / KHQR generation
- Auto payment confirmation
- Courier integration
- Delivery tracking update
- AI suggested replies
- AI order summary extraction
- Repeat customer detection

---

## Success Metrics

The product should improve these metrics:

- Faster first response time
- Higher inbox-to-order conversion rate
- Less manual order entry
- Fewer wrong-size or wrong-item orders
- Fewer missed customer messages
- Faster payment confirmation
- Faster delivery preparation
- Better repeat customer tracking

Example targets:

- Reduce first reply time by 30–50%
- Reduce manual order entry time by 50%
- Reduce order mistakes by 30%
- Increase confirmed orders from inbox leads
- Track 100% of paid and unpaid orders in one place

---

## Product Principle

This project is not just a chat inbox.

It is an order operations system for social sellers.

The main principle is:

> Every serious customer chat should become a structured order as quickly as possible.

---

## Documentation

Recommended docs to add:

```txt
docs/
├── PRD.md
├── API.md
├── DATABASE.md
├── USER-FLOWS.md
├── INTEGRATIONS.md
└── ROADMAP.md
```

---

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run lint and tests.
4. Open a pull request.
5. Describe the problem, solution, and screenshots if UI changes are included.

Branch naming examples:

```txt
feature/shared-inbox
feature/order-capture
feature/customer-profile
fix/payment-status
refactor/product-module
```

Commit message examples:

```txt
feat: add shared inbox conversation list
feat: create order from conversation
feat: add customer profile drawer
fix: correct payment status update
refactor: split order module services
docs: add PRD document
```

---

## License

This project is private by default.

Update this section if the repository becomes open source.

```txt
Copyright © 2026
All rights reserved.
```
