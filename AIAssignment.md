# Homework 4 AI Synthesis Activity

## Activity: You used AI

### Part 1

> Screenshots are in `/AIChats`

### Part 2

I used AI when parts of my app stopped working, mainly when my “Catch Pokemon" button wasn’t opening the form, and when the modal component broke. I also used it when the app kept saying “Failed to fetch,” because I wasn’t sure if it was my code or the API being down. Searching online didn’t help much since this assignment used a custom API. The AI helped me troubleshoot fast without wasting time digging through random GitHub issues.

### Part 3

The AI’s responses were correct and matched what the course API expected. For example, when I asked why my catch button didn’t open anything, it explained that I needed to pass an onCatch prop from App.tsx and toggle two pieces of state (showDetailsModal and showBoxForm). It gave me the exact JSX snippet that fixed it. When I said my modal was broken, it wrote the whole Modal.tsx file using React props and inline styles that worked instantly. I made sure I understood it, then used it. I didn’t have to edit much—just copied it in and tested. It didn’t hallucinate anything, everything matched the course’s structure.

### Part 4

One thing I didn’t know before was the import type syntax in TypeScript. ChatGPT explained that it’s required when using “verbatimModuleSyntax,” and it prevents runtime errors by telling TypeScript that the import is for types only. I looked that up afterwards and now understand why my build was complaining before. I also learned how React modals work, they render conditionally with a background overlay and use event propagation to prevent closing when clicking inside the modal.
