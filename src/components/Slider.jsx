import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${props => props.slideIndex * -100}vw);
  transition: all 1s ease 
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props => props.bg};
`

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  justify-content: center;
  display: flex;
  `
const Image = styled.img`
  height: 100%;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
const Title = styled.h1`
  font-size: 70px;
`
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer
`

const Slider = () => {
  const [ slideIndex, setSlideIndex ] = useState(0)
  const handleClick = (direction) => {
    if(direction === "right") {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    } else if(direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
  }
  
  setInterval(() => {
    handleClick("right")
  }, 5000)

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
       {sliderItems.map(item => (
         <Slide bg={item.bg} key={item.id}>
          <ImageContainer>
            <Image src={item.img}/>
          </ImageContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Description>{item.desc}</Description>
            <Link to='/products'>
              <Button>SHOP NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>      
       ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  )
}

export default Slider