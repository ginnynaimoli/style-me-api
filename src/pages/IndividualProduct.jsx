import { Add, Remove } from '@mui/icons-material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'
import { publicRequest } from '../../src/requestMethod'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartRedux'

const Container = styled.div``
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`
const ImageContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 5px;
  ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
  font-weight: 600;
`
const Description = styled.p`
  margin: 20px 0px;
`
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20pz;
  font-weight: 500;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
  &:active{
    border: 2px solid teal;
  }
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`
const FilterSizeOptions = styled.option``
const AddContainer = styled.div`
  width: 50%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  &:hover{
    background-color: teal;
  }
`

const IndividualProduct = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [ itemQuantity, setItemQuantity ] = useState(1)
  const [ product, setProduct ] = useState({})
  const [ color, setColor ] = useState('')
  const [ size, setSize ] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get(`/products/find/${id}`)
        setProduct(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProduct()
  }, [id])

  const handleQuantity = (type) => {
    if(type === 'decrease'){ itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
    else { setItemQuantity(itemQuantity + 1)}
  }

  const handleAddCart = () => {
    dispatch(addProduct({ ...product, itemQuantity, color, size }))
  }
  
  return (
    <Container>
      <Navbar />
      <Announcement />

      <Wrapper>
        <ImageContainer>
          <Image src={product.img?.[1]} />
        </ImageContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>${product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((color) => (
                <FilterColor 
                  color={color} key={color} 
                  onClick={()=> setColor(color)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=> setSize(e.target.value)}>
                <FilterSizeOptions disabled selected>select</FilterSizeOptions>
                {product.size?.map((size) => (
                  <FilterSizeOptions key={size}>{size}</FilterSizeOptions>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('decrease')}/>
              <Amount>{itemQuantity}</Amount>
              <Add onClick={() => handleQuantity('increase')}/>
            </AmountContainer>
            <Button onClick={handleAddCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  )
}

export default IndividualProduct