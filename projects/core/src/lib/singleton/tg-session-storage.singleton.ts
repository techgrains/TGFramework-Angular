
/**
 * TGFramework's SessionStorage implementation
 *
 * @export
 * @class TGSessionStoarage
 */
export class TGSessionStoarage {
    /** Singleton instance */
    private static instance: TGSessionStoarage = null;

    /** Gets TGSessionStoarage's instance reference */
    public static getInstance(): TGSessionStoarage {
        if (this.instance == null) {
            this.instance = new TGSessionStoarage();
        }
        return this.instance;
    }

    /** Private constructor */
    private constructor() {
    }

    /** Sets value for given key */
    private set(key: string, value: any): void {
        sessionStorage.setItem(key, value);
    }

    /** Gets value for given key */
    private get(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    /** Validate value is null or not */
    private isNull(value: string) {
        return value === undefined || value === null || value === 'null' || value === 'undefined';
    }

    /**
     * Sets number value for given key
     *
     * @param {strings} key      Key of storage
     * @param {number} value    Value of storage
     */
    setNumber(key: string, value: number): void {
        this.set(key, `${value}`);
    }

    /**
     * Gets number value for given key
     *
     * @param {strings} key  Key of storage
     * @returns {number}    Return value
     */
    getNumber(key: string): number {
        const value = this.get(key);
        return this.isNull(value) ? null : Number(value);
    }

    /**
     * Sets string value for given key
     *
     * @param {string} key      Key of storage
     * @param {string} value    Value of storage
     */
    setString(key: string, value: string): void {
        this.set(key, value ? value : 'null');
    }

    /**
     * Gets sting value for given key
     *
     * @param {string} key  Key of storage
     * @returns {number}    Return value
     */
    getString(key: string): string {
        const value = this.get(key);
        return this.isNull(value) ? null : this.get(key);
    }

    /**
     * Sets boolean value for given key
     *
     * @param {string} key      Key of storage
     * @param {boolean} value    Value of storage
     */
    setBoolean(key: string, value: boolean): void {
        this.set(key, `${value}`);
    }

    /**
     * Gets boolean value for given key
     *
     * @param {string} key  Key of storage
     * @returns {number}    Return value
     */
    getBoolean(key: string): boolean {
        const value = this.get(key);
        return this.isNull(value) ? null : value === 'true';
    }

    /**
     * Sets object value for given key
     *
     * @param {string} key      Key of storage
     * @param {object} value    Value of storage
     */
    setObject(key: string, value: object): void {
        this.set(key, value ? JSON.stringify(value) : 'null');
    }

    /**
     * Gets object value for given key
     *
     * @param {string} key  Key of storage
     * @returns {number}    Return value
     */
    getObject(key: string): object {
        const value = this.get(key);
        return this.isNull(value) ? null : JSON.parse(value);
    }

    /**
     * Removes value for given key
     *
     * @param {string} key  Key of storage
     * @returns {any}        Return value
     */
    remove(key: string): any {
        localStorage.removeItem(key);
    }

    /**
     * Clear all storage
     */
    clear() {
        localStorage.clear();
    }
}
