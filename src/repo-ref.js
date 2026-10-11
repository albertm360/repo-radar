export function parseRepoRef(ref) {
  const [owner, name] = ref.split('/');
  if (!owner || !name) {
    throw new Error(`Invalid repository reference: ${ref}`);
  }
  return { owner, name };
}
