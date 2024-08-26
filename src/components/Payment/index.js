import {Component} from 'react'
import {MdClear} from 'react-icons/md'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class Payment extends Component {
  state = {isconfirmed: false, method: ''}

  onPaymentMethod = event => {
    console.log(event.target.value)
    this.setState({method: event.target.value})
  }

  renderpaymentmethod = () => (
    <ul>
      {paymentOptionsList.map(each => (
        <li key={each.id}>
          <input
            type="radio"
            name="payment"
            disabled={each.isDisabled}
            id={each.id}
            onChange={this.onPaymentMethod}
            value={each.id}
          />
          <label htmlFor={each.id}>{each.displayText}</label>
        </li>
      ))}
    </ul>
  )

  onPlaceOrder = () => {
    this.setState({isconfirmed: true})
  }

  closeMethod = () => {
    const {close} = this.props
    close()
  }

  render() {
    const {isconfirmed} = this.state
    return (
      <div
        className="payment-method-main"
        aria-label="Description of the button"
      >
        <button
          type="button"
          className="clear-button"
          onClick={this.closeMethod}
        >
          <span className="visually-hidden">Add to cart</span>
          <MdClear />
        </button>
        {isconfirmed ? (
          <>
            <p className="successfully">
              Your order has been placed successfully
            </p>
          </>
        ) : (
          <CartContext.Consumer>
            {value => {
              const {cartList} = value
              const {method} = this.state
              let total = 0
              cartList.forEach(item => {
                total += item.price * item.quantity
              })
              return (
                <div>
                  <h1 className="payments-heading">Payments Details</h1>
                  <p className="payments-sub-heading">Payment Method</p>
                  {this.renderpaymentmethod()}
                  <div className="order-details">
                    <p className="payments-sub-heading">Order details:</p>
                    <p>Quantity: {cartList.length}</p>
                    <p>Total Price: RS {total}/-</p>
                  </div>
                  <button
                    disabled={method === ''}
                    type="button"
                    className="confirm-order-button"
                    onClick={this.onPlaceOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              )
            }}
          </CartContext.Consumer>
        )}
      </div>
    )
  }
}
export default Payment
