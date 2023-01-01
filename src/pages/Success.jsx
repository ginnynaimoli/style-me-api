import { CheckCircleOutline } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { resetProduct } from '../redux/cartRedux'
import { mobile } from '../responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://img.freepik.com/free-photo/cute-woman-with-red-lipstick-looks-into-camera-poses-with-white-big-bags-after-good-shopping_197531-17594.jpg?w=2000") center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ width: "75%" })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-top: 20px;
  ${mobile({ textAlign: 'center' })}
`
const Text = styled.div`
  margin: 5px;
  ${mobile({ textAlign: 'center' })}
`
const Button = styled.button`
  width: 12rem;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 25px auto 10px;
`

const Success = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(resetProduct())
  }

  return (
    <Container>
      <Wrapper>
        <CheckCircleOutline style={{ color: 'teal', width: '50px', height: '50px'}} />
        <Title>THANK YOU FOR YOUR PURCHASE</Title> 
        <Text>Your order number is <strong>{location.key}</strong></Text>  
        <Text>We'll email you an order confirmation with details and tracking information.</Text>            
        <Link to='/'>
          <Button onClick={handleReset}>CONTINUE SHOPPING</Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Success