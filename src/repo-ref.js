/** Extra characters allowed in an owner, besides letters and digits. */
const OWNER_EXTRA_CHARS = '-';

/** Extra characters allowed in a repo name, besides letters and digits. */
const NAME_EXTRA_CHARS = '._-';

/** Maximum owner length (GitHub's limit). */
const MAX_OWNER_LENGTH = 39;

/** Maximum repo name length (GitHub's limit). */
const MAX_NAME_LENGTH = 100;

/** Separator between owner and name. */
const SEPARATOR = '/';

/** Owner may not start or end with this. */
const OWNER_EDGE_CHAR = '-';

/** Owner may not contain this sequence. */
const OWNER_FORBIDDEN_SEQUENCE = '--';

/** Names that mean "current dir" / "parent dir" and are unsafe in paths. */
const RESERVED_NAMES = ['.', '..'];

/** Repo names may not end with this suffix. */
const RESERVED_NAME_SUFFIX = '.git';

/**
 * Throws a RangeError for an invalid repository reference.
 * @param {unknown} ref - The original input, shown in the error message.
 * @returns {never} Never returns; it always throws.
 * @throws {RangeError} Always.
 */
function fail(ref) {
  throw new RangeError(`Invalid repository reference: ${JSON.stringify(ref)}`);
}

/**
 * Checks whether a single character is a letter, a digit, or one of the extras.
 * @param {string} char - One character to check.
 * @param {string} extras - Extra allowed characters, e.g. '-' or '._-'.
 * @returns {boolean} `true` if the character is allowed.
 */
function isAllowedChar(char, extras) {
  const isLetter = (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
  const isDigit = char >= '0' && char <= '9';
  const isAllowedExtra = extras.includes(char);
  return isLetter || isDigit || isAllowedExtra;
}

/**
 * Checks that every character in a string is allowed.
 * @param {string} text - The string to check.
 * @param {string} extras - Extra allowed characters besides letters and digits.
 * @returns {boolean} `true` if all characters are allowed.
 */
function hasOnlyAllowedChars(text, extras) {
  for (const char of text) {
    if (!isAllowedChar(char, extras)) return false;
  }
  return true;
}

/**
 * Validates an owner, throwing if it breaks any owner rule.
 * @param {string} owner - The owner part of the reference.
 * @param {string} ref - The original input, used in the error message.
 * @throws {RangeError} If the owner is invalid.
 */
function validateOwner(owner, ref) {
  if (owner.length === 0 || owner.length > MAX_OWNER_LENGTH) fail(ref);
  if (!hasOnlyAllowedChars(owner, OWNER_EXTRA_CHARS)) fail(ref);
  if (owner.startsWith(OWNER_EDGE_CHAR) || owner.endsWith(OWNER_EDGE_CHAR)) fail(ref);
  if (owner.includes(OWNER_FORBIDDEN_SEQUENCE)) fail(ref);
}

/**
 * Validates a repository name, throwing if it breaks any name rule.
 * @param {string} name - The name part of the reference.
 * @param {string} ref - The original input, used in the error message.
 * @throws {RangeError} If the name is invalid.
 */
function validateName(name, ref) {
  if (name.length === 0 || name.length > MAX_NAME_LENGTH) fail(ref);
  if (!hasOnlyAllowedChars(name, NAME_EXTRA_CHARS)) fail(ref);
  if (RESERVED_NAMES.includes(name)) fail(ref);
  if (name.endsWith(RESERVED_NAME_SUFFIX)) fail(ref);
}

/**
 * Parses a GitHub repository reference like `owner/name`.
 * Surrounding whitespace is trimmed before validation.
 * @param {string} ref - The reference to parse, e.g. `'nodejs/node'`.
 * @returns {{ owner: string, name: string }} The owner and repository name.
 * @throws {RangeError} If the reference is not a string or breaks any owner/name rule.
 * @example
 * parseRepoRef('  vercel/next.js '); // { owner: 'vercel', name: 'next.js' }
 */
export function parseRepoRef(ref) {
  if (typeof ref !== 'string') fail(ref);

  const parts = ref.trim().split(SEPARATOR);
  if (parts.length !== 2) fail(ref);

  const [owner, name] = parts;

  validateOwner(owner, ref);
  validateName(name, ref);

  return { owner, name };
}
