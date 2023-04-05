// Can possibly be expanded to apply classes/etc
function buildCell(colSpan) {
  const cell = document.createElement('td');
  if (colSpan) cell.setAttribute('colspan', colSpan);
  return cell;
}

// Creating for potential future use to append classnames, etc
function buildRow() {
  return document.createElement('tr');
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link.href
  const res = await fetch(url);
  const json = await res.json();
  const data = json.data[0];

  let headers = [];
  let headerData = data._headers.replace(/[{]/g, '[');
  headerData = headerData.replace(/[}]/g, ']');
  headerData = headerData.replaceAll(',,', ',null,');
  headerData = JSON.parse(headerData);
  for (let headerName of headerData) {
    headers.push(headerName);
  }

  const table = document.createElement('table');
  const th = document.createElement('th');
  th.innerHTML = 'Capabilities Readiness';
  table.append(th);
  let row = buildRow();
  let cell = buildCell('4');
  cell.innerHTML = data['Initial Implementation Score'];
  row.append(cell);
  cell = buildCell('3');
  cell.innerHTML = data['CX Scale Score'];
  row.append(cell);
  table.append(row);

  row = buildRow();
  cell = buildCell('4');
  cell.innerHTML = 'Initial Implementation Score';
  row.append(cell);
  cell = buildCell('3');
  cell.innerHTML = 'CX Scale Score';
  row.append(cell);
  table.append(row);

  row = buildRow();
  cell = buildCell('2');
  row.append(cell);
  for (let header in headers) {
    cell = buildCell('2');
    cell.innerHTML = headers[header];
    row.append(cell);
  }
  table.append(row);

  block.innerHTML = '';
  block.append(table);
}
