# 🃏 Trade Card Platform

This project is a card trading platform built with **Nuxt 3** that allows users to:

- Manage their card collection
- Offer cards for trade
- Request trades from other users
- Finalize trades through a structured flow

The application focuses on clean state management, reusable UI, and persistent trading logic.

---

# ⚙️ Tech Stack

### Core

- **Nuxt 4**
- **Vue 3 (Composition API)**
- **Pinia** → Global state management
- **TailwindCSS (@nuxtjs/tailwindcss)** → UI styling
- **SweetAlert2** → User feedback & actions

---

# 📦 Architectural Decisions

## 🔹 Pinia Stores

State is split by responsibility to avoid fat components and maintain scalability.

### `userStore`

Responsible for:

- Logged user cards
- Ownership validation

Used for:

- Preventing duplicate cards in collection
- Validating trade eligibility

Example usage:

```
isAlreadyOwned = userStore.getUserCards.some(card => card.id === currentCard.id)
```

---

### `tradeStore`

Handles the trading flow.

Key states:

- `listCardsToOffer`
- `listCardsToReceive`
- `tradeRequest`

Persisted via `localStorage`.

Responsibilities:

- Add/remove offer cards
- Add/remove requested cards
- Maintain trade state across refresh
- Prevent duplicate offers

---

## 🔹 Local Persistence

We use `useCookie()` for:

- Auth token control

We use `localStorage` for:

- Trade session persistence

This allows:

✔ Logout-safe UI  
✔ Trade state recovery  
✔ No backend dependency for session continuity  

---

# 🧩 Component Strategy

Components are designed to be **state-aware but not state-responsible**.

## Card Component

Handles:

- Add to collection
- Offer for trade
- Remove from trade

### UI Logic

Buttons adapt based on state:

| Condition | Action |
|---|---|
| Card owned | Disable Add |
| Card already offered | Disable Offer |
| Card offered | Show "Offered" |
| Not logged in | View only |

Computed guards:

```
isAlreadyOwned
isAlreadyOffered
```

---

# 🔁 Trading Flow

## Offer Card

Adds card into:

- `tradeStore.listCardsToOffer`
- `tradeRequest`

## Remove Offer

Removes card from:

- `tradeRequest`
- `cardsToOffer`

Keeps localStorage in sync.

---

# 🔐 Authentication Handling

Token stored via:

```
const token = useCookie('token')
```

Logout flow:

- Clears token
- Redirects to homepage

Ensures UI resets without hard reload.

---

# 🎨 UI & UX Choices

## TailwindCSS

Chosen for:

- Speed
- Component isolation
- Utility-first consistency

Primary theme color:

```
#7367f0
```

Buttons use state-driven UI:

- Disabled opacity
- Dynamic labels
- Conditional actions

---

## SweetAlert2

Used for:

- Trade confirmation
- Error feedback

Icons standardized to valid types:

```
success | error | warning | info | question
```

Avoids TS type issues.

---

# 🧠 State Safety Patterns

Prevent duplication using:

```
.some(card => card.id === targetId)
```

Avoids:

- Multiple offers of same card
- Invalid trades
- UI desync

---

# 🚀 Development

Install dependencies:

```
npm install
```

Run locally:

```
npm run dev
```

---

# 🏗 Production

Build:

```
npm run build
```

Preview:

```
npm run preview
```

---

# 📌 Future Improvements

- Backend trade sync
- Real-time trading
- Notifications
- Trade history
- Matchmaking logic

---

# ✨ Summary

This project was structured to demonstrate:

- Clean state separation
- Persistent UX flows
- Component-driven UI
- Trade logic consistency

Built with scalability in mind.
