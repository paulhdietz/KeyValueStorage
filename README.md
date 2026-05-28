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

## Quick-start example

```typescript
input.onButtonPressed(Button.A, function () {
    let count = kvstore.getNumber("count", 0)
    count += 1
    kvstore.setNumber("count", count)
    basic.showNumber(count)
})

input.onButtonPressed(Button.B, function () {
    basic.showNumber(kvstore.getNumber("count", 0))
})
```

---

## Limits & caveats

| Constraint | Detail |
|---|---|
| Key length | Max **15 characters** |
| String value length | Max **~250 characters** per key |
| Number values | Stored as **32-bit integers**; decimals are truncated |
| Total flash | ~8 KB shared with the MakeCode runtime |

---

## License

MIT © 2026

<!-- for PXT/microbit -->
