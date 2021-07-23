import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function BusinessPagination({ pageNumber, setPageNumber, hasNextPage }) {
  function adjustPage(amount) {
    setPageNumber(prevPage => prevPage + amount)
  }

  return (
    <Pagination size="sm">
      {pageNumber !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {pageNumber !== 1 && <Pagination.Item onClick={() => setPageNumber(1)}>1</Pagination.Item>}
      {pageNumber > 2 && <Pagination.Ellipsis />}
      {pageNumber > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{pageNumber - 1}</Pagination.Item>}
      <Pagination.Item active="true">{pageNumber}</Pagination.Item>
      {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{pageNumber + 1}</Pagination.Item>}
      {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
    </Pagination>
  )
}