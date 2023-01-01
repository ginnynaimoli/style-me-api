import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", display: "flex", justifyContent: "space-between" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  `
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ display: "flex" })};
`
const Logo = styled.h1`
  font-weight: bold;
  margin: 0px;
  ${mobile({ fontSize: "2rem", margin: "0 20px" })};
`

const Right = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  ${mobile({ margin: "0 20px", flex: 1 })}
`
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "14px", marginLeft: '0px', marginRight: "5px", cursor: "pointer" })}
`

const Navbar = () => {
  const cartQuantity = useSelector(state => state.cart.cartQuantity)
  const currentUser = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()
  const handleLogout = () => {
    logout(dispatch)
  }
  
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search'></Input>
            <Search style={{ color: 'gray', fontSize: '16px' }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>STYLE.ME</Logo>
          </Link>
        </Center>

        <Right>
          {currentUser
            ? (
              <>
                <MenuItems>WELCOME, {currentUser.username}!</MenuItems>
                <Link to='/logout' style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItems onClick={handleLogout}>LOG OUT</MenuItems>
                </Link>
              </>
            )
            : (
              <>
                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItems>REGISTER</MenuItems>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItems>LOGIN</MenuItems>
                </Link>
              </>
            )
          }

          <Link to='/cart'>
            <MenuItems>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItems>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar