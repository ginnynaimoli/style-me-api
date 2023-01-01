import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
  width: 25%;
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
  margin-bottom: 50px;
`

const Button = styled.button`
  width: 10rem;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`

const Logout = () => {
  return (
    <Container>
      <Wrapper>
        <Title>YOU'RE SIGNED OUT</Title>               
        <Link to='/login'>
          <Button>LOG IN</Button>
        </Link>
        <Link to='/'>
          <Button>HOMEPAGE</Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Logout