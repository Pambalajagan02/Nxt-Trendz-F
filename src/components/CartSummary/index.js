// Write your code here
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import Payment from '../Payment'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalcost = 0
      cartList.forEach(each => {
        totalcost += each.quantity * each.price
      })
      return (
        <div className="summary-container">
          <h1>
            Order Total:<span>Rs {totalcost}/-</span>
          </h1>
          <p>{cartList.length}items in cart</p>
          <Popup
            modal
            trigger={
              <button className="checkout-button" type="button">
                Checkout
              </button>
            }
            position="top left"
          >
            {close => <Payment close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
