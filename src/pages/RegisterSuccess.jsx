import { CheckCircleOutline } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://img.freepik.com/free-photo/woman-black-trousers-purple-blouse-laughs-leaning-stand-with-elegant-clothes-pink-background_197531-17614.jpg?w=2000") center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 40%;
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
  return (
    <Container>
      <Wrapper>
        <CheckCircleOutline style={{ color: 'teal', width: '50px', height: '50px'}} />
        <Title>CONGRATULATIONS</Title> 
        <Text>Your account has been successfully created.</Text>  
        <Text>Please log in to start shopping.</Text>            
        <Link to='/login'>
          <Button>LOG IN</Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Success