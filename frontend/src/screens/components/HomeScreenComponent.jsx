import React, { useEffect, useState } from "react";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
import HeadingSectionComponent from "../../components/HeadingSectionComponent";
import MetaComponent from "../../components/MetaComponent";

function HomeScreenComponent({ categories }) {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);
  return (
    <>
      {/* <ProductCarouselComponent /> */}
      <MetaComponent />
      <HeadingSectionComponent />
      <Container>
        <h1 className="fw-bold  fs-1 pt-5">Kategori</h1>
        <Row xs={1} md={2} className="g-4 mt-5 justify-content-md-center">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeScreenComponent;
