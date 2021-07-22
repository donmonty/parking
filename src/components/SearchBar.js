import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchBar({ location, handleSearch }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control onChange={handleSearch} value={location} name="location" type="text" />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}