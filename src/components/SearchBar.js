import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

export default function SearchBar({ handleSearchValue, handleSearch, loading, location }) {
  return (
    <Form className="mb-4" onSubmit={handleSearch} >
      <Form.Row className="d-flex align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={handleSearchValue} value={location} name="location" type="text" />
        </Form.Group>
        <Button type="submit" disabled={loading} >Search</Button>
      </Form.Row>
    </Form>
  )
}