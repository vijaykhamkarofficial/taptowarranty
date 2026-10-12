# Tap-to-Warranty (HTML/CSS/JavaScript + Firebase)

A starter project with a QR scanner, public warranty detail page, shopkeeper login, warranty registration, QR generation/download, and service history.

## Important before use
- Firebase must be configured before the app can save or retrieve data.
- Do not publish real customer data until you have reviewed privacy, access, retention, and local legal requirements.
- Public warranty lookup only permits fetching a known document ID, not listing all warranties. The page masks the customer's name. Do not put sensitive personal details in public service notes.
- This starter is not yet a complete commercial deployment: no payments, multi-shop tenant separation, warranty proof upload, customer SMS/WhatsApp, or audit/backup workflow.

## 1. Create Firebase project
1. Open https://console.firebase.google.com/ and create a project.
2. In Project settings, add a Web App and copy the Firebase config.
3. Open `firebase.js` and replace all `PASTE_YOUR_...` placeholder values with the exact config from Firebase. Do not put a service-account/private key in frontend code.
4. In Firebase Console → Build → Firestore Database, create a database.
5. In Firebase Console → Build → Authentication → Sign-in method, enable **Email/Password**.
6. In Authentication → Users, create the shopkeeper account. Copy its **User UID**.
7. In Firestore Data, create collection `admins`, document ID equal to that UID, and field `enabled` (boolean) = `true`.
8. In Firestore Rules, paste the contents of `firestore.rules` and publish.

## 2. Run the app
Because JavaScript modules need a web server, do not open the HTML files directly using `file://`.
- Easiest local option on a computer: install Node.js, open a terminal in this folder, then run `npx serve .` and open the URL it prints.
- You can also deploy the folder to Firebase Hosting: install Firebase CLI, run `firebase login`, `firebase init hosting`, choose the existing project and set this folder as the public directory, then `firebase deploy`.
- Camera scanning needs HTTPS (Firebase Hosting provides HTTPS) or localhost. Allow camera permission in the browser.

## 3. Register the first warranty
1. Open `/admin.html`, sign in with the admin account.
2. Fill in the product and purchase information and click **Register warranty & generate QR**.
3. The record is stored in Firestore at `warranties/{generatedId}`. A QR and customer link are generated.
4. Download/print the QR or share the link. Scanning it opens `warranty.html?id=...`.
5. To add a repair/update, enter the warranty ID in **Add service record**.

## 4. Existing DEMO-WARRANTY QR text
The scanner recognizes text shaped like `DEMO-WARRANTY:TW-ABC123:extra-data` and extracts `TW-ABC123`. For details to appear, the Firestore document ID must be exactly `TW-ABC123`. The sample ID shown in the screenshot is only a demo identifier until its matching record exists in Firestore. The code cannot infer product/customer details from the ID itself.

## 5. Data model
`warranties/{id}` fields include `warrantyId`, `customerLabel` (masked public label), `productName`, `brand`, `model`, `serialNumber`, `purchaseDate` (YYYY-MM-DD), `expiryDate` (YYYY-MM-DD), `warrantyMonths`, `coverage`, `terms`, `status`, `createdAt`, `createdBy`.

`privateWarrantyData/{id}` stores full `customerName` and `customerPhone`; only admins can read it.

`warranties/{id}/services/{serviceId}` fields include `type`, `title`, `notes`, `createdAt`, `createdBy`.

## Security notes
- Firestore rules restrict writes to users whose UID has an enabled `admins/{uid}` record.
- Public warranty detail lookup is possible by a known ID. Full customer name and phone are stored separately in `privateWarrantyData/{id}`, which is admin-only. The public page only receives a masked label.
- For a production system, add per-shop access control, rate limiting/app checks, data minimization, backups, monitoring, and a privacy notice. Consider keeping service notes private and serving customer details through a server-side endpoint if needed.
