# KONGO'S Restaurant Website

A modern restaurant website for KONGO'S Restaurant in Brandon, Manitoba, featuring menu display, gallery, reservations, and contact functionality.

## Features

- Responsive design
- Menu display
- Photo gallery
- Contact form with Brevo integration
- Reservation system
- Mobile-friendly navigation

## Deployment on Render

### Prerequisites

1. A [Render](https://render.com) account
2. A [Brevo](https://www.brevo.com) account (free tier available)
3. Git repository with this code

### Setup Instructions

#### 1. Get Your Brevo API Key

1. Go to [Brevo](https://app.brevo.com)
2. Sign up or log in
3. Navigate to **Settings** → **SMTP & API** → **API Keys**
4. Create a new API key (v3)
5. Copy the API key - you'll need it for Render

#### 2. Deploy to Render

**Option A: Using render.yaml (Recommended)**

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **New** → **Blueprint**
4. Connect your repository
5. Render will detect the `render.yaml` file automatically
6. Set the environment variables:
   - `BREVO_API_KEY`: Your Brevo API key
   - `SENDER_EMAIL`: The email you want to send from (must be verified in Brevo)
   - `RECIPIENT_EMAIL`: nexgenfec@gmail.com (already set in render.yaml)
7. Click **Apply** to deploy

**Option B: Manual Web Service**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your repository
4. Configure:
   - **Name**: kongos-restaurant
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `BREVO_API_KEY`: Your Brevo API key
   - `SENDER_EMAIL`: Your verified sender email
   - `RECIPIENT_EMAIL`: nexgenfec@gmail.com
6. Click **Create Web Service**

#### 3. Verify Sender Email in Brevo

1. Go to Brevo **Settings** → **Senders & IP**
2. Add and verify the email address you want to use as `SENDER_EMAIL`
3. Follow Brevo's verification process

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Add your Brevo API key to `.env`:
   ```
   BREVO_API_KEY=your_actual_api_key
   SENDER_EMAIL=noreply@yourdomain.com
   RECIPIENT_EMAIL=nexgenfec@gmail.com
   ```

4. Run the development server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email Service**: Brevo (Sendinblue)
- **Hosting**: Render

## Contact Form API

The contact form sends data to `/api/contact` endpoint which uses Brevo's transactional email API to deliver messages.

## Environment Variables

- `BREVO_API_KEY`: Your Brevo API key (required)
- `SENDER_EMAIL`: Email address for sending (must be verified in Brevo)
- `RECIPIENT_EMAIL`: Email to receive contact form submissions
- `PORT`: Server port (automatically set by Render)

## Support

For questions or issues, contact nexgenfec@gmail.com
