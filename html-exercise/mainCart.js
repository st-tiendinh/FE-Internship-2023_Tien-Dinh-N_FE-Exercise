function renderProductTable() {
  const productTable = document.querySelector('.product-table');
  let data = JSON.parse(window.localStorage.getItem('product'));
  console.log(data);
  let productData = `
    <h3>Total:</h3>
    <table>
      ${data
        .map((item) => {
          return `
        <tr>
          <th>${item.id}</th>
          <th>${item.name}</th>
          <th>${item.quantity}</th>
          <th>${item.price}</th>
        </tr>
        `;
        })
        .join('')}
    </table>
  `;

  productTable.innerHTML += productData;
}

renderProductTable();
