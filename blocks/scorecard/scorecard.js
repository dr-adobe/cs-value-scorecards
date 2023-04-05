export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link.href
  const res = await fetch(url);
  const json = await res.json();

  const table = document.createElement('table');
  const row = document.createElement('tr');
  const cell = document.createElement('td');

  cell.innerHTML = json;
  row.append(cell);
  table.append(row);
  block.innerHTML = '';
  block.append(table);
}
