function renderProductTable() {
  const productTable = document.querySelector('product-table');
  const data = window.localStorage.getItem('product');
  let productData = `
    <h3>Total:</h3>
    <table>
      ${data.map((item) => {
        return `
        <tr>
          <th>${item.id}</th>
          <th>${item.name}</th>
          <th>${item.quantity}</th>
          <th>${item.price}</th>
        </tr>
        `;
      })}
    </table>
  `;
}
