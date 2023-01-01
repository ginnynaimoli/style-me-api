import React, { useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Add, DeleteOutline, Remove } from '@mui/icons-material'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userRequest } from '../requestMethod'
import { deleteProduct, increaseQuantity, decreaseQuantity } from '../redux/cartRedux'

const KEY = process.env.REACT_APP_STRIPE_KEY

const Container = styled.div``
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filler" && "none"};
  background-color: ${props => props.type === "filler" ? "black" : "transparent"};
  color: ${props => props.type === "filler" && "white"};
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  padding: 5px;
  ${mobile({ width: '120px' })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: '15px' })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Delete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
  ${mobile({ margin: "10px" })}
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  :disabled {
    background-color: gray;
  }
`

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const shippingCost = cart.totalPrice ? 5 : 0
  const shippingDiscount = cart?.totalPrice >= 50 ? -shippingCost : 0
  const [ stripeToken, setStripeToken ] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.currentUser)

  const onToken = (token) => {
    setStripeToken(token)
  }
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100
        })
        history.push('/success', { data: response.data })
      } catch (err) {
        console.error(err.response.data)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken, cart.totalPrice, history])

  const handleDelete = (product) => {
    dispatch(deleteProduct(product))
  }

  const decrease = (product) => {
    if(product.itemQuantity > 1) {
      dispatch(decreaseQuantity(product))
    }
  }

  const increase = (product) => {
    dispatch(increaseQuantity(product))
    console.log(product)
  }

  console.log(cart)


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to='/'>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <StripeCheckout
              name="Style Me"
              image="https://cdn.freebiesupply.com/logos/large/2x/style-26-logo-png-transparent.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.totalPrice}`}
              amount={cart.totalPrice * 100}
              token={onToken}
              stripeKey={KEY}  
            >
              <TopButton type="filled">CHECKOUT AS GUEST</TopButton> 
            </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img[0]} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => decrease(product)} />
                    <ProductAmount>{product.itemQuantity}</ProductAmount>
                    <Add onClick={() => increase(product)}/>
                  </ProductAmountContainer>

                  <ProductPrice>$ {product.price * product.itemQuantity}</ProductPrice>
                  <Delete>
                    <DeleteOutline onClick={() => handleDelete(product)} style={{ height: '30px', width: '30px'}}/>
                  </Delete>
                </PriceDetail>
                <Hr />
              </Product>
              ))
            }
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotals</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                $ {shippingCost}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                $ {shippingDiscount}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Totals</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice + shippingCost + shippingDiscount}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Style.Me"
              image="https://cdn.freebiesupply.com/logos/large/2x/style-26-logo-png-transparent.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.totalPrice}`}
              amount={cart.totalPrice * 100}
              token={onToken}
              stripeKey={KEY}  
            >
              {user 
                ? (<Button>CHECKOUT NOW</Button>)
                : (<Button disabled>LOG IN TO CHECK OUT</Button>)
              }
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart