import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
  const [ref, inView] = useInView();

  // 무한 스크롤
  // 지정한 타겟 div가 화면에 보일 때 마다 서버에 요청을 보냄
  const productFetch = () => {
    axios
    .get(`https://localhost:8080/products/main?pageNo=${page}&pageSize=5`)
    .then((res) => {
      setProducts([...products, ...(res.data)])
      // 요청 성공 시에 페이지에 1 카운트 해주기
      setPage((page) => page + 1)
    })
    .catch((err) => {console.log(err)});
  };

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, '무한 스크롤 요청 🎃')
      productFetch();
    }
  }, [inView]);

  const clickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.background}>
      <TopNav />

      <HomeBanner />
      <div className={styles.body}>
        <div className={styles.onsale}>판매중</div>
        <div className={styles.scrollarea}>
          {products?.map((product) => {
            return (
              <ProductItem
                key={product.productId}
                product={product}
                clickProduct={clickProduct}
              />
            );
          })}
          <div ref={ref}>안녕</div>
        </div>
        <BottomNav/>
      </div>
    </div>
  );
}