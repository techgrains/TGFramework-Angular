
/**
 * TGFramework's Session implementation
 *
 * @export
 * @class TGLocalStoarage
 */
export class TGSession {
    /** Singleton instance */
    private static instance: TGSession;

    /** Holds all key-values as Map */
    private map: Map<string, object>;

    /** Gets TGSession's instance reference */
    public static getInstance(): TGSession {
        if (this.instance == null) {
            this.instance = new TGSession();
        }
        return this.instance;
    }

    /** Private constructor */
    private constructor() {
        this.map = new Map<string, object>();
    }

    /**
     * Sets value for given key
     *
     * @param {string} key
     * @param {*} value
     */
    set(key: string, value: any): void {
        this.map.set(key, value);
    }

    /**
     * Gets value for given key
     *
     * @param {string} key
     * @returns {*}
     * @memberof TGSession
     */
    get(key: string): any {
        return this.map.get(key);
    }

    /**
     * Removes value for given key
     *
     * @param {string} key
     * @returns {*}
     * @memberof TGSession
     */
    remove(key: string): any {
        return this.map.delete(key);
    }

    /**
     * Clear all
     *
     * @memberof TGSession
     */
    clear() {
        this.map.clear();
    }
}
