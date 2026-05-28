# microbit-kvstore

A MakeCode extension for the **BBC micro:bit** that provides simple nonvolatile
**key-value storage**. Data is written to the micro:bit's internal flash memory
and **survives power-off, resets, and battery changes**.

---

## Blocks overview

The extension adds a **KV Store** category (red) with three groups:

### Write
| Block | Description |
|---|---|
| `KV set string key [] value []` | Store a text value |
| `KV set number key [] value []` | Store a number (integer) |
| `KV set boolean key [] value []` | Store true / false |

### Read
| Block | Description |
|---|---|
| `KV get string key [] default []` | Read a text value (returns default if missing) |
| `KV get number key [] default []` | Read a number (returns default if missing) |
| `KV get boolean key [] default []` | Read a boolean (returns default if missing) |

### Utility
| Block | Description |
|---|---|
| `KV has key []` | `true` if the key exists |
| `KV remove key []` | Delete one key |
| `KV clear all` | Delete everything managed by this extension |
| `KV number of keys` | How many keys are stored |
| `KV list of keys` | Comma-separated string of all keys (debug) |

---

## Quick-start example (Blocks / JavaScript)

```typescript
// On button A press: increment and save a counter
input.onButtonPressed(Button.A, function () {
    let count = kvstore.getNumber("count", 0)
    count += 1
    kvstore.setNumber("count", count)
    basic.showNumber(count)
})

// On button B press: read and display the saved counter
input.onButtonPressed(Button.B, function () {
    basic.showNumber(kvstore.getNumber("count", 0))
})

// On shake: reset the counter
input.onGesture(Gesture.Shake, function () {
    kvstore.remove("count")
    basic.showString("RST")
})
```

---

## Limits & caveats

| Constraint | Detail |
|---|---|
| Key length | Max **15 characters** (micro:bit runtime limit) |
| String value length | Max **~250 characters** per key |
| Number values | Stored as **32-bit integers**; decimals are truncated |
| Total flash | ~8 KB shared with the MakeCode runtime — keep data small |
| Key characters | Letters, digits, and underscores recommended |

> **Tip:** This extension uses the micro:bit's built-in `settings` namespace
> (Settings storage), which is separate from the user program flash. Your code
> is safe — only the data area is affected.

---

## Adding to your MakeCode project

1. Open your project on [makecode.microbit.org](https://makecode.microbit.org).
2. Click the **gear ⚙ → Extensions** menu.
3. Paste the GitHub URL of this repository and press Enter.
4. The **KV Store** category will appear in the block palette.

---

## License

MIT © 2026
