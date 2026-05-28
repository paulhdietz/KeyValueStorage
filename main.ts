/**
 * KVStore — Nonvolatile Key-Value Storage for micro:bit
 *
 * Wraps the micro:bit's built-in flash (Settings) storage with a friendly
 * block API. Data survives power-off and resets.
 *
 * Key rules imposed by the underlying runtime:
 *   - Keys must be non-empty strings, max 15 characters.
 *   - String values max ~255 characters per key.
 *   - Number values are stored as 32-bit integers (decimals are truncated).
 *   - Total flash storage is shared with the MakeCode runtime (~8 KB available).
 */

//% color="#e63946" weight=90 icon="\uf1c0" block="KV Store"
namespace kvstore {

    // ─── Internal helpers ────────────────────────────────────────────────────

    const TYPE_STR = "s";
    const TYPE_NUM = "n";
    const TYPE_BOOL = "b";

    /** Prefix a key so we can detect the stored type without extra entries. */
    function sKey(key: string): string { return "s_" + key; }
    function nKey(key: string): string { return "n_" + key; }
    function bKey(key: string): string { return "b_" + key; }
    /** Meta key that tracks every stored user key in a comma-delimited list. */
    const INDEX_KEY = "__kv_idx";

    /** Return the current index array (user-facing keys, not prefixed). */
    function getIndex(): string[] {
        const raw = settings.readString(INDEX_KEY);
        if (!raw || raw.length === 0) return [];
        return raw.split(",");
    }

    /** Persist the index array. */
    function saveIndex(idx: string[]): void {
        settings.writeString(INDEX_KEY, idx.join(","));
    }

    /** Add a key to the index if it isn't already present. */
    function registerKey(key: string): void {
        const idx = getIndex();
        if (idx.indexOf(key) < 0) {
            idx.push(key);
            saveIndex(idx);
        }
    }

    /** Remove a key from the index. */
    function unregisterKey(key: string): void {
        const idx = getIndex();
        const pos = idx.indexOf(key);
        if (pos >= 0) {
            idx.splice(pos, 1);
            saveIndex(idx);
        }
    }

    // ─── Write blocks ────────────────────────────────────────────────────────

    /**
     * Store a text value under the given key.
     * The value is written to nonvolatile flash and survives power-off.
     * @param key   Storage key (max 15 characters)
     * @param value Text to store (max ~250 characters)
     */
    //% blockId=kvstore_set_string
    //% block="KV set string key %key value %value"
    //% key.defl="myKey"
    //% value.defl="hello"
    //% weight=90
    //% group="Write"
    export function setString(key: string, value: string): void {
        settings.writeString(sKey(key), value);
        registerKey(key);
    }

    /**
     * Store a number under the given key.
     * Decimal values are truncated to the nearest integer.
     * @param key   Storage key (max 15 characters)
     * @param value Number to store
     */
    //% blockId=kvstore_set_number
    //% block="KV set number key %key value %value"
    //% key.defl="myNum"
    //% value.defl=0
    //% weight=85
    //% group="Write"
    export function setNumber(key: string, value: number): void {
        settings.writeNumber(nKey(key), value);
        registerKey(key);
    }

    /**
     * Store a boolean (true/false) under the given key.
     * @param key   Storage key (max 15 characters)
     * @param value Boolean to store
     */
    //% blockId=kvstore_set_boolean
    //% block="KV set boolean key %key value %value"
    //% key.defl="myFlag"
    //% value.defl=false
    //% weight=80
    //% group="Write"
    export function setBoolean(key: string, value: boolean): void {
        settings.writeNumber(bKey(key), value ? 1 : 0);
        registerKey(key);
    }

    // ─── Read blocks ─────────────────────────────────────────────────────────

    /**
     * Read a stored text value. Returns the default if the key doesn't exist.
     * @param key          Storage key
     * @param defaultValue Fallback if key is missing, eg: ""
     */
    //% blockId=kvstore_get_string
    //% block="KV get string key %key default %defaultValue"
    //% key.defl="myKey"
    //% defaultValue.defl=""
    //% weight=90
    //% group="Read"
    export function getString(key: string, defaultValue: string): string {
        if (!settings.exists(sKey(key))) return defaultValue;
        return settings.readString(sKey(key));
    }

    /**
     * Read a stored number. Returns the default if the key doesn't exist.
     * @param key          Storage key
     * @param defaultValue Fallback if key is missing, eg: 0
     */
    //% blockId=kvstore_get_number
    //% block="KV get number key %key default %defaultValue"
    //% key.defl="myNum"
    //% defaultValue.defl=0
    //% weight=85
    //% group="Read"
    export function getNumber(key: string, defaultValue: number): number {
        if (!settings.exists(nKey(key))) return defaultValue;
        return settings.readNumber(nKey(key));
    }

    /**
     * Read a stored boolean. Returns the default if the key doesn't exist.
     * @param key          Storage key
     * @param defaultValue Fallback if key is missing, eg: false
     */
    //% blockId=kvstore_get_boolean
    //% block="KV get boolean key %key default %defaultValue"
    //% key.defl="myFlag"
    //% defaultValue.defl=false
    //% weight=80
    //% group="Read"
    export function getBoolean(key: string, defaultValue: boolean): boolean {
        if (!settings.exists(bKey(key))) return defaultValue;
        return settings.readNumber(bKey(key)) !== 0;
    }

    // ─── Utility blocks ───────────────────────────────────────────────────────

    /**
     * Check whether a key exists in the store.
     * @param key Storage key to check
     */
    //% blockId=kvstore_has
    //% block="KV has key %key"
    //% key.defl="myKey"
    //% weight=75
    //% group="Utility"
    export function has(key: string): boolean {
        const idx = getIndex();
        return idx.indexOf(key) >= 0;
    }

    /**
     * Delete a single key from the store.
     * @param key Storage key to remove
     */
    //% blockId=kvstore_remove
    //% block="KV remove key %key"
    //% key.defl="myKey"
    //% weight=70
    //% group="Utility"
    export function remove(key: string): void {
        settings.remove(sKey(key));
        settings.remove(nKey(key));
        settings.remove(bKey(key));
        unregisterKey(key);
    }

    /**
     * Delete ALL keys managed by this extension.
     * Other settings (e.g. Bluetooth pairing) are not affected.
     */
    //% blockId=kvstore_clear
    //% block="KV clear all"
    //% weight=65
    //% group="Utility"
    export function clear(): void {
        const idx = getIndex();
        for (const key of idx) {
            settings.remove(sKey(key));
            settings.remove(nKey(key));
            settings.remove(bKey(key));
        }
        settings.remove(INDEX_KEY);
    }

    /**
     * Returns the number of keys currently stored.
     */
    //% blockId=kvstore_size
    //% block="KV number of keys"
    //% weight=60
    //% group="Utility"
    export function size(): number {
        return getIndex().length;
    }

    /**
     * Returns a comma-separated list of all stored keys (for debugging).
     */
    //% blockId=kvstore_keys
    //% block="KV list of keys"
    //% weight=55
    //% group="Utility"
    export function keys(): string {
        return getIndex().join(",");
    }
}
