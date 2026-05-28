/**
 * KVStore — Nonvolatile Key-Value Storage for micro:bit
 */

//% color="#e63946" weight=90 icon="\uf1c0" block="KV Store"
namespace kvstore {

    /**
     * Store a number under the given key.
     * @param key Storage key, eg: "myKey"
     * @param value Number to store, eg: 0
     */
    //% blockId=kvstore_set_number
    //% block="KV set number key %key value %value"
    //% key.defl="myKey" value.defl=0
    //% weight=90 group="Write"
    export function setNumber(key: string, value: number): void {
        settings.writeNumber(key, value);
    }

    /**
     * Read a stored number. Returns the default if the key doesn't exist.
     * @param key Storage key, eg: "myKey"
     * @param defaultValue Returned when key is missing, eg: 0
     */
    //% blockId=kvstore_get_number
    //% block="KV get number key %key default %defaultValue"
    //% key.defl="myKey" defaultValue.defl=0
    //% weight=85 group="Read"
    export function getNumber(key: string, defaultValue: number): number {
        if (settings.exists(key)) {
            return settings.readNumber(key);
        }
        return defaultValue;
    }

    /**
     * Store a text value under the given key.
     * @param key Storage key, eg: "myKey"
     * @param value Text to store, eg: "hello"
     */
    //% blockId=kvstore_set_string
    //% block="KV set string key %key value %value"
    //% key.defl="myKey" value.defl="hello"
    //% weight=80 group="Write"
    export function setString(key: string, value: string): void {
        settings.writeString(key, value);
    }

    /**
     * Read a stored text value. Returns the default if the key doesn't exist.
     * @param key Storage key, eg: "myKey"
     * @param defaultValue Returned when key is missing, eg: ""
     */
    //% blockId=kvstore_get_string
    //% block="KV get string key %key default %defaultValue"
    //% key.defl="myKey" defaultValue.defl=""
    //% weight=75 group="Read"
    export function getString(key: string, defaultValue: string): string {
        if (settings.exists(key)) {
            return settings.readString(key);
        }
        return defaultValue;
    }

    /**
     * Check whether a key exists in the store.
     * @param key Storage key to check, eg: "myKey"
     */
    //% blockId=kvstore_has
    //% block="KV has key %key"
    //% key.defl="myKey"
    //% weight=70 group="Utility"
    export function has(key: string): boolean {
        return settings.exists(key);
    }

    /**
     * Delete a key from the store.
     * @param key Storage key to remove, eg: "myKey"
     */
    //% blockId=kvstore_remove
    //% block="KV remove key %key"
    //% key.defl="myKey"
    //% weight=65 group="Utility"
    export function remove(key: string): void {
        settings.remove(key);
    }

    /**
     * Delete all settings.
     */
    //% blockId=kvstore_clear
    //% block="KV clear all"
    //% weight=60 group="Utility"
    export function clear(): void {
        settings.clear();
    }
}
