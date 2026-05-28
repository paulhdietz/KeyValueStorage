/**
 * KVStore — Test / Example program
 *
 * Button A  → increment a persistent counter and show it
 * Button B  → show the saved greeting string
 * A+B       → list all keys over serial, then clear everything
 * Shake     → toggle and save a boolean flag; show T or F
 */

// ── Startup: show how many keys are already saved ──────────────────────────
basic.showString("K:" + kvstore.size())
basic.pause(800)

// ── Button A: persistent counter ───────────────────────────────────────────
input.onButtonPressed(Button.A, function () {
    let n = kvstore.getNumber("count", 0)
    n += 1
    kvstore.setNumber("count", n)
    basic.showNumber(n)
})

// ── Button B: stored greeting ──────────────────────────────────────────────
input.onButtonPressed(Button.B, function () {
    if (!kvstore.has("greet")) {
        kvstore.setString("greet", "Hi!")
    }
    basic.showString(kvstore.getString("greet", "???"))
})

// ── A+B: inspect then clear ────────────────────────────────────────────────
input.onButtonPressed(Button.AB, function () {
    serial.writeLine("Keys: " + kvstore.keys())
    serial.writeLine("Count: " + kvstore.size())
    kvstore.clear()
    serial.writeLine("Cleared!")
    basic.showIcon(IconNames.Sad)
    basic.pause(500)
    basic.clearScreen()
})

// ── Shake: toggle boolean flag ─────────────────────────────────────────────
input.onGesture(Gesture.Shake, function () {
    const current = kvstore.getBoolean("flagOn", false)
    const next = !current
    kvstore.setBoolean("flagOn", next)
    basic.showString(next ? "T" : "F")
})
