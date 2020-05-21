export class TGArrayUtil {

    public static find(array: Array<any>, key, value, defaultValue?) {
        if (array) {
            const foundItem = array.find(item => item[key] === value);
            if (foundItem) {
                return foundItem;
            }
        }
        return defaultValue;
    }
}
