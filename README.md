| Field | Value |
| :--- | :--- |
| Repository URL | https://github.com/ailynb006/cse134b-hw3 |
| Part 1 Deployed URL | https://134b-hw3.netlify.app/part1/cheese.html |
| Part 2 Deployed URL | https://134b-hw3.netlify.app/ |

# Homework 5

## Web component design note `<facts-spotlight>`

- **Visitor Goal:** A visitor on the projects page wants to read a random cat fact and optionally toggle compact display mode for the card
- **Action Trace (Requesting a New Fact):** Clicking the **"Tell me something about cats"** control triggers an asynchronous `fetch()` call to the cat facts API inside `<facts-spotlight>`
- **Waiting State:** While the request is ongoing, the widget displays a loading state so the visitor knows a new fact is being fetched.
- **Success State:** When the response resolves with valid fact text, `<facts-spotlight>` updates its DOM content to display the new cat fact (and preserves any saved `compact` mode preference from `localStorage` inside a `try/catch` block)
- **Failure State:** If the network request fails or returns an error, the widget updates the DOM with a clear error message rather than leaving a broken or blank state, and a `<noscript>` fallback lets visitors when JavaScript is disabled

## Astro SSG Exercise (part 4)

This folder contains the files for the ssg exercise, demonstrating a shared footer astro component for index.astro ('/') and resume.astro ('/resume')

### Setup, Build and preview

To install dependencies:
```bash
    npm install
```
To build the static site:
```bash
    npm run build
```
To preview both pages:
```bash
    npm run preview
```