export const isClientSide = process.browser === true;

export const isServerSide: boolean =
    typeof window === 'undefined' || !isClientSide;
