## Code Style and Development

### Avoid default exports, use named exports

```ts
// ❌ Bad
const AboutPage: React.FC = () => ...

export default AboutPage;

// ✅ Good
export const AboutPage: React.FC = () => ...
```

### No Barrel Files

Avoid using barrel files (`index.ts`) for re-exports. Import directly from the source file instead.

```ts
// ❌ Bad: barrel file re-export
import { BookDetailsPage } from "./pages/BookDetailsPage";

// ✅ Good: direct import
import { BookDetailsPage } from "./pages/BookDetailsPage/BookDetailsPage";
```

### Build URLs using URL and URLSearchParams API

Avoid constructing URLs manually as this is not secure. Especially when dealing with user input or external data.

```ts
// ❌ Bad: manual construction
const response = await fetch(`/api/sync?id=${pairingCode}&type=answer`);

// ✅ Good: use of URLSearch API
const urlParams = new URLSearchParams({ type: "answer", id: pairingCode });
const response = await fetch(`/api/sync?${urlParams.toString()}`);
```

### Avoid non-null assertion operator if possible

Be explicit and wordy: check if the property exists. If it does not, throw error.

```ts
// bad
if (this.pc!.iceGatheringState === "complete") { ... }

// good
if (!this.pc) {
  throw new Error("Unexpected state: RTCDataChannel is empty")
}

if (this.pc.iceGatheringState === "complete") { ... }
```

### Type Checking

Use the project's npm script for TypeScript validation:

```bash
npm run typecheck
```

Do not use `npx tsc --noEmit` directly.
