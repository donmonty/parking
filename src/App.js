import React, { useState } from "react"
import useGetParking from "./useGetParking"
import { Container } from "react-bootstrap"
import Business from "./components/Business"
import SearchBar from "./components/SearchBar"
import BusinessPagination from "./components/BusinessPagination"
import Spinner from 'react-bootstrap/Spinner'


export default function App() {
  const [location, setLocation] = useState("Santa Barbara");
  const [pageNumber, setPageNumber] = useState(1)
  const [searchValue, setSearchValue] = useState(location)

  const { parking, loading, error, hasNextPage, excess, noResults } = useGetParking(location, pageNumber)

  const handleSearchValue = (e) => {
    const searchValue = e.target.value
    setSearchValue(searchValue)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setPageNumber(1)
    setLocation(searchValue)
  }

  return (
    <Container className="my-4" >
      <h1 className="mb-4">Parking Lot Search</h1>
      <SearchBar handleSearchValue={handleSearchValue}  handleSearch={onSubmit} loading={loading} location={searchValue}/>
      {(!excess && !loading && !error ) && <BusinessPagination pageNumber={pageNumber} setPageNumber={setPageNumber} hasNextPage={hasNextPage}/>}
      
      {loading && <Spinner animation="border" variant="primary" />}
      {/* {(error.status && error.status === 400) && <h2>Try searching for something a bit less weird.</h2>} */}
      {(error === "Request failed with status code 400") && <h2>Try searching for something a bit less weird.</h2>}
      {(error === true && error !== "Request failed with status code 400") && <h2>Something went wrong.</h2>}
      {excess && <h2>Too many results. Try narrowing your search.</h2>}
      {noResults && <h2>No results found.</h2>}
      {parking.map(business => {
        return <Business key={business.id} business={business} />
      })}
      {(!excess && !loading && !error) && <BusinessPagination pageNumber={pageNumber} setPageNumber={setPageNumber} hasNextPage={hasNextPage}/>}
    </Container>
  )

}