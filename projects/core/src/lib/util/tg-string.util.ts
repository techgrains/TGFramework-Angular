export class TGStringUtil {

    public static ellipsisStart(str: string, maxEndLength: number) {
        if (!str || str.length <= (maxEndLength + 3)) {
            return str;
        }
        return `...${str.substring(str.length - maxEndLength)}`;
    }

    public static ellipsisEnd(str: string, maxStartLength: number) {
        if (!str || str.length <= (maxStartLength + 3)) {
            return str;
        }
        return `${str.substring(0, maxStartLength)}...`;
    }

    public static ellipsisInBetween(str: string, maxStartLength: number, maxEndLength: number) {
        if (!str || str.length <= (maxStartLength + maxEndLength + 3)) {
            return str;
        }
        return `${str.substring(0, maxStartLength)}...${str.substring(str.length - maxEndLength)}`;
    }

    public static trimNullSafe(data) {
        if (data) {
            try {
                return data.trim();
            } catch (err) {
                return data;
            }
        }
        return data;
    }
}
