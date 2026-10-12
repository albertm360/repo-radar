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
});
