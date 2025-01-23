// 定義 ProductsListItem 元件，用於渲染單列產品資訊
function ProductsListItem({ product, onClick }) {
  // 解構 product 中的屬性
  const { title, origin_price, price, is_enabled } = product;
  return (
    <tr>
      <th scope="row">{title}</th>
      <td>{origin_price}</td>
      <td>{price}</td>
      <td>{is_enabled ? "啟用" : "否"}</td>
      <td>
        <button
          type="button"
          // 使用 Bootstrap 樣式
          className="btn btn-primary"
          onClick={() => onClick(product)}
        >
          查看細節
        </button>
      </td>
    </tr>
  );
}

export default ProductsListItem;