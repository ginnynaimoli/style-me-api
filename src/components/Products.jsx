import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = ({ category, filters, sort }) => {
  const [ products, setProducts ] = useState([])
  const [ filteredProducts, setFilteredProducts ] = useState([])
  const location = useLocation()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category 
            ? `https://style-me-api.onrender.com/api/products?category=${category}`
            : 'https://style-me-api.onrender.com/api/products')

        setProducts(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    filters && setFilteredProducts(
      products?.filter((item) => 
        Object.entries(filters).every(([key, value]) => item[key].includes(value))
      )
    )
  }, [products, filters])

  useEffect(() => {
    if(sort === 'asc'){
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

  return (
  <Container>
    {location.pathname === '/'
      ? products.slice(0,8).map(item => (<Product item={item} key={item._id} />))
      : filteredProducts.map(item => (<Product item={item} key={item._id} />))
    }
  </Container>
  )
}

export default Products