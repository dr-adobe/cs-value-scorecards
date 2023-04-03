import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link.href
  console.log("This is the path " + url);
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
}

