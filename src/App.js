import React, { useState } from "react"
import useGetParking from "./useGetParking"

import BusinessPagination from "./components/BusinessPagination"
import Spinner from 'react-bootstrap/Spinner'
import MasterPage from './components/MasterPage'
import SearchForm from './components/SearchForm'
import ResultList from "./components/ResultList"


export default function App() {
  const [location, setLocation] = useState("Santa Barbara");
  const [pageNumber, setPageNumber] = useState(1)
  const [searchValue, setSearchValue] = useState(location)

  const { parking, loading, error, hasNextPage, excess, noResults, total } = useGetParking(location, pageNumber)

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
    <MasterPage>
      <h1 className="mb-4">Parking Lot Search</h1>
      <SearchForm
        handleSearchValue={handleSearchValue}
        handleSearch={onSubmit}
        location={searchValue}
      />
      
      {loading && <Spinner animation="border" variant="primary" />}
      
      {(error === "Request failed with status code 400") && <h2>Try searching for something a bit less weird.</h2>}
      {(error === true && error !== "Request failed with status code 400") && <h2>Something went wrong.</h2>}
      {excess && <h2>Too many results. Try narrowing your search.</h2>}
      {noResults && <h2>No results found.</h2>}
      <ResultList list={parking} total={total} />
      
      {(!excess && !loading && !error) && <BusinessPagination pageNumber={pageNumber} setPageNumber={setPageNumber} hasNextPage={hasNextPage}/>}
    </MasterPage>
  )

}