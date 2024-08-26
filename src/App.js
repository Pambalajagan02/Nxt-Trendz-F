import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = decobj => {
    const {cartList} = this.state
    const decrementobj = cartList.find(each => each.id === decobj.id)
    if (decrementobj.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === decrementobj.id) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(decobj.id)
    }
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => {
        if (each.id !== id) {
          return each
        }
        return null
      }),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state

    //   TODO: Update the code here to implement addCartItem
    const productobj = cartList.find(each => each.id === product.id)
    console.log(product)
    if (productobj) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === productobj.id) {
            const updatedquantity = each.quantity + productobj.quantity
            return {...each, quantity: updatedquantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prev => ({cartList: [...prev.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
