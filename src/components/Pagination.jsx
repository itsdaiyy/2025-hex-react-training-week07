import { getProducts } from "../services/apiAdminProducts";

function Pagination({
  pageInfo,
  setProducts,
  setPageInfo,
  setIsScreenLoading,
}) {
  async function handlePageChange(page, e) {
    e.preventDefault();
    setIsScreenLoading(true);
    const data = await getProducts(page);
    if (data === null) return;
    setProducts(data.products);
    setPageInfo(data.pagination);
    setIsScreenLoading(false);
  }

  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={(e) => handlePageChange(pageInfo?.current_page - 1, e)}
              className={`page-link ${!pageInfo?.has_pre && `disabled`}`}
              href="#"
            >
              上一頁
            </a>
          </li>
          {Array.from(
            { length: pageInfo?.total_pages },
            (_, index) => index + 1
          ).map((el) => (
            <li className="page-item" key={el}>
              <a
                onClick={(e) => handlePageChange(el, e)}
                className={`page-link ${
                  el === pageInfo?.current_page && `active`
                }`}
                href="#"
              >
                {el}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              onClick={(e) => handlePageChange(pageInfo?.current_page + 1, e)}
              className={`page-link ${!pageInfo?.has_next && `disabled`}`}
              href="#"
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
