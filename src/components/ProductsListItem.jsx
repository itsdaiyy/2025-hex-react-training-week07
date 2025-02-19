// 定義 ProductsListItem 元件，用於渲染單列產品資訊
function ProductsListItem({ product, onEdit, onDelete, setProducts }) {
  const { id, category, title, origin_price, price, is_enabled } = product;

  return (
    <tr>
      <th scope="row">{category}</th>
      <th scope="row">{title}</th>
      <td>{origin_price}</td>
      <td>{price}</td>
      <td>
        {is_enabled ? (
          <span className="text-success">啟用</span>
        ) : (
          <span className="text-danger">否</span>
        )}
      </td>
      <td>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={onEdit}
          >
            編輯
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={onDelete}
          >
            刪除
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductsListItem;
