import React, { useState, useCallback, useRef } from "react"
import useParkingSearch from "./useParkingSearch"
import { Container } from 'react-bootstrap'
import Business from "./components/Business"
import SearchBar from "./components/SearchBar"
import Spinner from 'react-bootstrap/Spinner'


export default function App() {

  const [location, setLocation] = useState('Santa Barbara')
  const [pageNumber, setPageNumber] = useState(1)

  const { parking, loading, hasMore, error } = useParkingSearch(location, pageNumber)

  const observer = useRef()
  const lastParkingRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleSearch = (e) => {
    setLocation(e.target.value)
    setPageNumber(1)
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Parking Lot Search</h1>
      {/* <SearchBar location={location} handleSearch={handleSearch} /> */}
      <input type="text" value={location} onChange={handleSearch}></input>
      {parking.map((parkingItem, index) => {
        if (parking.length === index + 1) {
          // return <div ref={lastParkingRef} key={parkingItem}>{parkingItem}</div>
          return <div ref={lastParkingRef} key={parkingItem.id}><Business business={parkingItem}/></div>
        } else {
          // return <div key={parkingItem}>{parkingItem}</div>
          return <div key={parkingItem.id}><Business business={parkingItem}/></div>
        }
      })}
      <div>{loading && <Spinner animation="border" variant="primary"/>}</div>
      <div>{error && 'Error'}</div>
    </Container>
  );
}


