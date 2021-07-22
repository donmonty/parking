import React, { useState } from 'react'
import { Card, Button, Collapse } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

export default function Business({ business }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {business.name}
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {`${business.review_count} reviews`}
              <Badge bg="info" className="mr-2">Rating: {business.rating}</Badge>
            </Card.Subtitle>

           
            
            <div style={{ wordBreak: 'break-all' }}>
              <a href={business.url}>Visit Yelp page</a>
            </div>
          </div>
          {/* <img className="d-none d-md-block" height="100" alt={business.name} src={business.image_url} /> */}
          <Image height="100" src={business.image_url} rounded/>
          
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="primary"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <p>{business.location.display_address[0]}</p>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}