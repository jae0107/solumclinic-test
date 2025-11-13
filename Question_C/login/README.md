# React Login Page with Zod Validation & MUI

A simple, responsive login page built using **React**, **Material UI (MUI)**, and **Zod** for form validation.

---

## 🚀 Project Overview
This project demonstrates a modern login page with:
- Email & password validation using Zod
- Snackbar notifications for success/error
- Responsive design using MUI breakpoints

---

## ✅ Features
- React + TypeScript
- Material UI for modern UI components
- Zod for schema-based validation
- React Hook Form for form handling
- Snackbar for user feedback
- Responsive layout using MUI `sx` breakpoints

---

## 🛠 Installation
```bash
cd login
npm install
```

---

## ▶️ Usage
```bash
npm start
```

---

## ✅ Validation Rules
- Password must be 8–16 characters long
- Must include:
  - One uppercase letter
  - One lowercase letter
  - One number
  - One special character

Example Zod schema:
```typescript
const schema = z.object({
  email: z.string().nonempty({ message: 'Email is required.' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required.' })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,16}$/,
      {
        message:
          'Password must be 8–16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    ),
});
```

---

## ✅ Responsive Design
Uses MUI `sx` shorthand:
```jsx
<Box sx={{ width: { xs: '95%', sm: '500px' } }} />
```

---

## ✅ Snackbar Example
```typescript
dispatchSnackBar({
  payload: {
    open: true,
    type: 'success',
    message: 'Welcome!',
  },
});
```

---

## 📜 License
MIT
