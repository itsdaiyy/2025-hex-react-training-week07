import styles from "./ProductDetails.module.css";

// 定義 ProductDetails 元件，用於顯示單一產品的詳細資訊
function ProductDetails({ product }) {
  const {
    category,
    content,
    description,
    origin_price,
    price,
    title,
    imageUrl,
    imagesUrl,
  } = product;

  return (
    <div className="card">
      <img
        src={imageUrl}
        // 套用自訂樣式和 Bootstrap 樣式
        className={`${styles.cardImg}  card-img-top`}
        alt={title}
      />
      <div className="card-body">
        <h3 className="card-title h5 mb-3">
          {title}
          <span className="badge text-bg-primary ms-2">{category}</span>
        </h3>
        <ul className="list-unstyled mb-5">
          <li className="mb-3">商品內容：{content}</li>
          <li className="mb-3">商品描述：{description}</li>
          <li className="mb-3">
            <s className="text-secondary">{origin_price}</s> 元 / {price} 元
          </li>
        </ul>
        <h4 className="h6 mb-3">更多圖片</h4>
        <ul className="list-unstyled d-flex gap-2 flex-wrap">
          {/* 使用圖片 URL 作為唯一鍵值 */}
          {imagesUrl.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`title ${index + 1}`}
                className={`${styles.squareImg} ${styles.objectFit}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;
