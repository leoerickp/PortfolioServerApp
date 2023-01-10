export const searchTransform = (search: string): string[] => {
    return search?.trim().split(' ');
}