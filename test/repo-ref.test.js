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
});
