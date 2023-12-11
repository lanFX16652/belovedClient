import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Space, Menu, Badge } from "antd";
import classes from "./MainLayout.module.css";
import { selectUser, setUser } from "../store/userSlice";
import { selectQtyCartItem, getCart } from "../store/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  //   color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};
const contentStyle = {
  // textAlign: "center",
  minHeight: 120,
  color: "black",
  // backgroundColor: "#108ee9",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "black",
};

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userRedux = useSelector(selectUser);
  const cartQuantity = useSelector(selectQtyCartItem);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (user) {
      dispatch(setUser(JSON.parse(user)));
      dispatch(getCart());
    }
  }, [user, dispatch]);

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>
          <div className={classes["navbar-wrapper"]}>
            <Space size={24}>
              <NavLink to="/">
                <span>Home</span>
              </NavLink>
              <NavLink to="/shoppage">
                <span>Shop</span>
              </NavLink>
            </Space>

            <div>
              <span>Boutique</span>
            </div>

            <Space size={24}>
              <NavLink to="/cartpage">
                <Badge count={cartQuantity}>
                  <span>
                    <ShoppingCartOutlined />
                  </span>
                </Badge>
              </NavLink>
              {userRedux ? (
                <NavLink>
                  <span onClick={logoutHandler}>Logout</span>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <span>Login</span>
                </NavLink>
              )}
            </Space>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          <div className={classes["footer-wrapper"]}>
            <div>
              <h4>FREE SHIPPING</h4>
            </div>
            <div>
              <h4>CONTACT US</h4>
            </div>
          </div>
        </Footer>
      </Layout>
    </Space>
  );
};

export default MainLayout;
