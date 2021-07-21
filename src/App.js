import React, { useState, useCallback, useRef } from "react"
import useParkingSearch from "./useParkingSearch"


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
    <React.Fragment>
      <input type="text" value={location} onChange={handleSearch}></input>
      {parking.map((parkingItem, index) => {
        if (parking.length === index + 1) {
          return <div ref={lastParkingRef} key={parkingItem}>{parkingItem}</div>
        } else {
          return <div key={parkingItem}>{parkingItem}</div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </React.Fragment>
  );
}


