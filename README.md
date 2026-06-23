# Fabruby

Fabruby is a fashion storefront prototype built with React, Vite, TypeScript, Tailwind CSS, and Firebase.

## What is wired up

- Firebase Auth for sign-in and registration
- Firestore-backed user profile, settings, cart, wishlist, orders, shipping addresses, and reviews
- Responsive storefront UI with mobile-first navigation
- Demo checkout flow that records an order locally in Firestore-backed user data

## Run locally

1. Install dependencies:
   `npm install`
2. Start the app:
   `npm run dev`
3. Open `http://localhost:3000`

## Environment

The app uses Firebase directly in `src/lib/firebase.ts`.

If you want to swap in your own Firebase project, update the config in that file and make sure Firestore is enabled.

## Build

Create a production build with:

`npm run build`

## Notes

- Checkout is a polished demo flow right now, not a live Paystack integration.
- Product data is still seeded from local catalog data for the prototype.
- Firestore security rules are limited to the signed-in user owning their `/users/{uid}` document.
