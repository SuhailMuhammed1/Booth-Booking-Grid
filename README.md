# Booth Booking Grid

This project is a small, interactive floor plan application for booking exhibition booths, built with plain HTML, CSS, and JavaScript. It provides a clean, responsive interface for users to view booth availability, see prices, and manage a booking cart in real-time.

The application is fully accessible via keyboard navigation, ensuring a good user experience for all.

## What Was Built & Assumptions

This project implements a single-page booth booking system with the following features:

*   **Interactive Floor Plan:** A grid layout displays all available and pre-booked booths.
*   **Hover & Focus Interaction:** Hovering over (or focusing on) an available booth reveals its price and an "Add Booth" button. Hovering over a booked booth clearly indicates its status.
*   **Dynamic Booking Cart:** Users can add multiple booths to a cart. The cart updates instantly, showing the selected items and the running total price without a page reload.
*   **State Management:** Booths on the floor plan visually change state when selected (`.selected`), and the hover action changes from "Add" to "Cancel".
*   **Cart Management:** Users can remove individual items from the cart or clear the entire cart with a confirmation prompt.
*   **Accessibility:** The entire application is navigable and operable using a keyboard (`Tab`, `Enter`, `Space`). Focus indicators are present on all interactive elements.

### Assumptions

*   The booth data (ID, price, status) is provided via a static array in the JavaScript file. In a real-world application, this would be fetched from a server API.
*   The application is client-side only; there is no backend to persist the bookings.
*   The currency is hardcoded as "KD" but can be easily changed.

## Data Structure Overview

The core data for the application is managed through a simple array of objects in `script.js`. Each object represents a single booth and follows a consistent structure:

```javascript
const booths = [
    { id: 'A1', price: 100, status: 'available' },
    { id: 'A2', price: 120, status: 'booked' },
    // ... more booths
];
```

*   `id` (String): A unique identifier for the booth (e.g., 'A1').
*   `price` (Number): The booking price for the booth.
*   `status` (String): The initial state of the booth, either `'available'` or `'booked'`.

The user's shopping cart (`cart`) is also an array, storing the full objects of the booths that have been selected.

## What I'd Improve With More Time

*   **Backend Integration:** Connect the front-end to a REST API to fetch booth data and persist bookings in a database.
*   **State Persistence:** Use `localStorage` or `sessionStorage` to save the user's cart contents, so they persist even if the page is reloaded.
*   **Component-Based Refactoring:** While not using a framework was a requirement, the code could be further modularized into components (e.g., a `Booth` component, a `Cart` component) to improve maintainability as the application grows.

## Demo

Visit the live site at [Booth Booking Grid](https://luxdrivelimo.com). 

<img width="1920" height="928" alt="Booth-Booking-Grid-09-10-2025_05_28_PM" src="https://github.com/user-attachments/assets/d7e7efff-99bb-4c2d-8adc-9b7a235c098d" />
