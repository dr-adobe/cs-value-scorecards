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

function cleanJSON(value) {
  let returnValue = value.replaceAll(/[{]/g, '[');
  returnValue = returnValue.replaceAll(/\[]{}"/g, '');
  returnValue = returnValue.split(",");
  return returnValue;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const url = link.href
  const res = await fetch(url);
  const json = await res.json();
  const data = json.data[0];

  let headers = [];
  let headerData = cleanJSON(data._headers);
  for (let headerName of headerData) {
    headers.push(headerName);
  }

  const table = document.createElement('table');
  const th = document.createElement('th');
  th.innerHTML = 'Capabilities Readiness';
  table.append(th);
  let row = buildRow();
  let cell = buildCell('4');
  cell.innerHTML = Math.floor(data['Initial Implementation Score'] * 100);
  row.append(cell);
  cell = buildCell('3');
  cell.innerHTML = Math.floor(data['CX Scale Score'] * 100);
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

  for (let key in data) {
    row = buildRow();
    let scoreCardRow = cleanJSON(data[key]);
    for (let entry in scoreCardRow) {
      cell = buildCell();
      cell.innerHTML = scoreCardRow[entry];
      row.append(cell);
    }
    table.append(row);
  }

  block.innerHTML = '';
  block.append(table);
}
