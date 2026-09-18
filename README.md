# CAPTROL ACTIVE Demo OTP App

## What this version does

- Any valid 10-digit Indian phone number can be used.
- Fixed demo OTP: `123456`
- Signup with full name, phone and role.
- Customer/distributor dashboard.
- Logout.
- Data is stored in browser localStorage.

## Important

This is only a demo authentication flow. It does not send SMS and it is not secure for production. Do not use it for real payments, private customer data, or admin access.

## Run

1. Extract the ZIP.
2. Open `index.html` in a browser.

For best results, run it through a local static server or GitHub Pages.

## Next production step

Replace demo localStorage authentication with Supabase Auth + a real SMS provider. The fixed OTP must be removed before launch.
