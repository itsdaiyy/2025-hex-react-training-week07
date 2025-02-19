import { useState } from "react";
import { addProduct, getProducts } from "../services/apiProducts";

const newProducts = [
  {
    data: {
      title: "台灣 水洗 阿里山山脈 梅山",
      category: "中焙",
      origin_price: 1000,
      price: 900,
      unit: "200g",
      description: `來自台灣阿里山梅山的水洗豆，帶來豐富的果香與甜感層次。🌞 乾香散發出梅子、紅肉李子與蜜棗乾的濃郁氣息，彷彿陽光下曬乾的果實，溫暖而誘人。🍂 啜飲時，酸甜平衡的醃漬梅子與紅肉李子風味躍然於舌尖，伴隨蜜糖與橘子的細膩甜感，讓口感滑順且富有層次。尾韻悠長，帶有李子與梅餅的獨特香氣，交織出柔和的紅糖甜韻🍯 令人回味無窮。✨`,
      content: "Taiwan Anaerobic Washed Alishan Meishan - Medium Roast",
      is_enabled: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1722782280946-d7cc43f7ac4d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imagesUrl: [
        "https://images.unsplash.com/photo-1575467627652-0c597f6dba77?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "",
        "",
        "",
        "",
      ],
    },
  },
];

function UploadProduct({ setProducts }) {
  const [message, setMessage] = useState("");

  async function handleClick() {
    const res = await addProduct();
    if (res === null) setMessage("上傳產品失敗");
    setMessage(res);

    const data = await getProducts();
    setProducts(data);
  }

  return (
    <div className="container my-4 d-flex align-items-center">
      <button
        type="button"
        className="btn btn-outline-primary me-4"
        onClick={handleClick}
      >
        上傳產品
      </button>
      <span>{message}</span>
    </div>
  );
}

export default UploadProduct;
