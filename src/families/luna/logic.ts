/*
 * Example: For derivation path "44'/330'/0'/0/0", returns
 * [44, 330, 0, 0, 0].
 */
export const parseDerivationPathStringToArray = (path: string): number[] => {
  return path
    .replace(/'/g, "")
    .split("/")
    .map((level) => Number(level));
};
