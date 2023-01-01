import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'

const Header = styled.h2`
  font-size: 2rem;
  margin: 50px auto 0px 25px;
`
const All = styled(Link)`
  color: black;
  display: flex;
  justify-content: right;
  margin-right: 50px;
  cursor: pointer;
  ${mobile({ marginRight: '20px'}) }
`

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Header>NEW ARRIVALS</Header>
      <All to='/products'>SHOP ALL</All>
      <Products />
      <Header>SHOP BY CATEGORIES</Header>
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home