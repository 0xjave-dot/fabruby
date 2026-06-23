# Fabruby

Fabruby is a fashion storefront prototype built with React, Vite, TypeScript, Tailwind CSS, and Firebase.

## What is wired up

- Firebase Auth for sign-in and registration
- Firestore-backed user profile, settings, cart, wishlist, orders, shipping addresses, and reviews
- Guest checkout that can complete the demo flow without sign-in
- Firebase Storage-backed catalog image uploads from the admin panel
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

## Firebase deploy

The repo now includes a minimal `firebase.json` so the standard Firebase CLI picks up Firestore and Storage rules together:

`firebase deploy --only firestore,storage`

If you also want hosting:

`firebase deploy --only hosting,firestore,storage`

## Admin claims

To grant the Firestore admin claim required by the catalog panel:

1. Set `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS` in your environment.
2. Run:

   `npm run grant-admin -- --email admin@example.com`

   or:

   `npm run grant-admin -- --uid FIREBASE_UID`

Use `--revoke` with the same command to remove the claim.

## Notes

- Checkout is a polished demo flow right now, not a live Paystack integration.
- Product data is still seeded from local catalog data for the prototype.
- Firestore security rules allow catalog reads and restrict writes to authenticated admins with the `admin` custom claim.
- Storage rules allow public reads of catalog assets and restrict writes to authenticated admins with the `admin` custom claim.
