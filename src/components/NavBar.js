import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct'

function NavBarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    // Simulate the purchase process (update state)
    setIsLoading(true);

    // Simulate an API call or any other asynchronous action
    setTimeout(() => {
      setIsPurchased(true);
      setIsLoading(false);
    }, 800); // Simulated 0.8-second delay
  };

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ?
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => {
                return <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
              })}

              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

              {isLoading ? (
                <p>Processing...</p>
              ) : isPurchased ? (
                <p>Congratulations! Purchase successful!</p>
              ) : (
                <Button onClick={handlePurchase} variant="success">Purchase</Button>
              )}
            </>
            :
            <h1>There are no items in your cart!</h1>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavBarComponent;