export function parseRepoRef(ref) {
  const [owner, name] = ref.trim().split('/');  
  if (!owner || !name) {
    throw new Error(`Invalid repository reference: ${ref}`);
  }
  return { owner, name };
}
