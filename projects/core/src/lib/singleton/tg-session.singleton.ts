
/**
 *  TGFramework's Session implementation
 */
export class TGSession {
    /// Singleton instance
    private static instance: TGSession = null;

    /// Holds all key-values as Map
    private map;

    /// Gets TGSession's instance reference
    public static getInstance(): TGSession {
        if (this.instance == null) {
            this.instance = new TGSession();
        }
        return this.instance;
    }

    /// Private constructor
    private constructor() {
        this.map = new Map<string, object>();
    }

    /// Sets value for given key
    set(key: string, value: any): void {
        this.map[key] = value;
    }

    /// Gets value for given key
    get(key: string): any {
        return this.map[key];
    }

    /// Removes value for given key
    remove(key: string): any {
        return this.map.remove(key);
    }

    /// Clear all
    clear() {
        this.map.clear();
    }
}
