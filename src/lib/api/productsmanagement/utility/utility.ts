// Utility function to flatten the tagTypes object into a flat array
export function flattenTags(tagObject: Record<string, any>): string[] {
    return Object.values(tagObject).reduce((acc: string[], curr) => {
        if (typeof curr === 'object') {
            // Ensure that all values inside curr are strings before spreading them
            return [...acc, ...Object.values(curr).filter(value => typeof value === 'string')];
        }
        if (typeof curr === 'string') {
            return [...acc, curr];
        }
        return acc;
    }, []);
}

