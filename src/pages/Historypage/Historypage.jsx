import React, { useEffect } from "react";
import classes from "./Historypage.module.css";
import { Badge, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../store/orderSlice";

const Historypage = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  console.log(orders);
  const ordersData = orders?.allOrderTransform;

  const navigate = useNavigate();

  const columns = [
    {
      title: "ID ORDER",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "ID USER",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "FULLNAME",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "PHONE",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "TOTAL PRICE",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "DELIVERY",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (value) => <Badge status="success" text={value} />,
    },
    {
      title: "DETAIL",
      dataIndex: "detail",
      key: "detail",
      render: (detail, record) => (
        <button onClick={() => navigate(`/history/${record._id}`)}>View</button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  return (
    <>
      <div
        className={`d-flex justify-content-between align-items-center p-5 fst-italic ${classes.header}`}
      >
        <h1>HISTORY</h1>
        <div>
          <h6 className={classes["breadcrum"]}>HISTORY</h6>
        </div>
      </div>

      <Table scroll={{ x: true }} columns={columns} dataSource={ordersData} />
    </>
  );
};

export default Historypage;
