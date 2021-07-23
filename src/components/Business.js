import React, { useState } from 'react'
import { Card, Button, Collapse } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'

export default function Business({ business }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
            <a className="text-decoration-none text-reset" href={business.url}>{business.name}</a>
              
            </Card.Title>
            <Card.Subtitle className="text-muted mb-3 mt-3">
              <span className={(business.rating < 3) ? "p-1 bg-danger text-light rounded" : "p-1 bg-primary text-light rounded"} >Rating: {business.rating}</span>
            </Card.Subtitle>
            <Card.Subtitle className="mb-2" >
              {`${business.review_count} reviews`}
            </Card.Subtitle>
          </div>
          <Image height="100" src={business.image_url} rounded/>
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="outline-primary"
            size="sm"
            className="mt-3"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <ListGroup variant="flush">
            <ListGroup.Item><span className="fw-bold" >Address: </span>{business.location.display_address[0]}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold" >City: </span>{business.location.city}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold" >Country: </span>{business.location.country}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold" >State: </span>{business.location.state}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold" >Zip: </span>{business.location.zip_code}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold" >Phone: </span>{business.display_phone}</ListGroup.Item>
          </ListGroup>
          
        </Collapse>
      </Card.Body>
    </Card>
  )
}