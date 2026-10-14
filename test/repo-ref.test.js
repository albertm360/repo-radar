import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseRepoRef } from '../src/repo-ref.js';

describe('parseRepoRef', () => {
  it('parses owner/name', () => {
    assert.deepEqual(parseRepoRef('nodejs/node'), {
      owner: 'nodejs',
      name: 'node',
    });
  });

  it('trims surrounding whitespace', () => {
    assert.deepEqual(parseRepoRef('  nodejs/node \n'), {
      owner: 'nodejs',
      name: 'node',
    });
  });

  it('accepts dots, dashes and underscores in repo names', () => {
    assert.deepEqual(parseRepoRef('vercel/next.js'), {
      owner: 'vercel',
      name: 'next.js',
    });
    assert.deepEqual(parseRepoRef('a-b/c_d-e.f'), {
      owner: 'a-b',
      name: 'c_d-e.f',
    });
  });

  const malformed = [
    '',
    '   ',
    'nodejs',
    '/node',
    'nodejs/',
    'a/b/c',
    'nodejs/..',
    'nodejs/.',
    '../node',
    '-bad/repo',
    'bad-/repo',
    'bad--name/repo',
    'owner/repo.git',
    'owner/na me',
    'owner/na;me',
    'owner/na\nme',
    `${'a'.repeat(40)}/repo`,
    `owner/${'a'.repeat(101)}`,
  ];
  for (const input of malformed) {
    it(`rejects ${JSON.stringify(input)}`, () => {
      assert.throws(() => parseRepoRef(input), RangeError);
    });
  }

  const invalidTypes = [null, undefined, 42, {}, [], ['a/b'], true, false];
  for (const input of invalidTypes) {
    it(`rejects non-string ${JSON.stringify(input)}`, () => {
      assert.throws(() => parseRepoRef(input), {
        name: 'TypeError',
        message: /must be a string/,
      });
    });
  }
});
