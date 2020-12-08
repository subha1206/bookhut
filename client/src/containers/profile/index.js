import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrders } from '../../redux/actions/orderActions';
import { uploadProfilePic } from '../../redux/actions/userActions';

import { Link } from 'react-router-dom';

import Loader from '../../components/common/loader';
import convertDate from '../../utils/convertDate';
import './profile.styles.scss';

const Profile = () => {
  const [picture, setPicture] = useState(null);
  const orderDetails = useSelector((state) => state.order);
  const userLogin = useSelector((state) => state.user);
  const { myOrders, loading } = orderDetails;
  const { user } = userLogin;

  const dispatch = useDispatch();

  const hadleChange = (e) => {
    setPicture(e.target.files[0]);
  };
  const combinedName = (order) => {
    if (order.orderItems.length > 1) {
      return `${order.orderItems[0].name}, and ${
        order.orderItems.length - 1
      } more`;
    }
    return `${order.orderItems[0].name}`;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', picture);
    if (picture) {
      dispatch(uploadProfilePic(formData));
    } else {
      alert('Please select a photo!');
    }
  };

  useEffect(() => {
    dispatch(getAllMyOrders());
  }, [dispatch]);

  return (
    <div className="profile__container">
      <div className="profile__container__user">
        <div className="profile__container__user__container">
          {userLogin.loading ? (
            <Loader />
          ) : (
            <img src={user?.photo} alt="User" />
          )}
          <form>
            <input onChange={hadleChange} type="file" name="photo" id="photo" />
            <button onClick={handleUpload} type="submit">
              Upload
            </button>
          </form>
          <h3>{user?.name}</h3>
          <p>Email : {user?.email}</p>
        </div>
      </div>
      <div className="profile__container__orders">
        <h2>Orders</h2>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Loader />
          </div>
        ) : (
          <div className="profile__container__orders__list">
            <ul>
              {myOrders.map((order) => {
                return (
                  <Link
                    to={`/order/${order._id}`}
                    key={order._id}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <li className="profile__container__orders__item">
                      <div className="order__container__list__item__details">
                        <img src={order.orderItems[0].image} alt="ddd" />
                        <p className="title">{combinedName(order)}</p>
                      </div>
                      <div className="order__container__list__item__price">
                        <p>Orderd At : {convertDate(order.createdAt)}</p>
                        <p>Price : {order.totalPrice.toFixed(2)}</p>
                        <p>
                          Deliverd :{' '}
                          {order.isDelivered ? 'dsdsdd' : 'Not delivered'}
                        </p>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
