import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  // console.log(categoryName, paginationLinksNumber, pageNum);
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        {/* page aktif disabled */}
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>

    // <Pagination>
    //   <Pagination.Prev />
    //   <Pagination.Item>{1}</Pagination.Item>

    //   <Pagination.Item>{10}</Pagination.Item>
    //   <Pagination.Item>{11}</Pagination.Item>
    //   <Pagination.Item active>{12}</Pagination.Item>
    //   <Pagination.Item>{13}</Pagination.Item>
    //   <Pagination.Item>{14}</Pagination.Item>

    //   <Pagination.Item>{20}</Pagination.Item>
    //   <Pagination.Next />
    // </Pagination>
  );
};

export default PaginationComponent;
