import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../../../service/AuthHeader.js";
import "./PaymentProduct.css";
import { getCurrentIdUser } from "../../../service/AuthService.js";
import { toast } from "react-toastify";

const PaymentProduct = ({ data }) => {
	const idUser = getCurrentIdUser();
	const [dataUser, setDataUser] = useState([]);
	const [loading, setLoading] = useState();
	const url = `${process.env.REACT_APP_API_LOCAL}/api/v1/users/profile/${idUser}`;

	useEffect(() => {
		const loadCart = () => {
			axios
				.get(url, { headers: authHeader() })
				.then((res) => {
					setDataUser(res.data.data.userData);
				})
				.catch((err) => console.log(err));
		};
		loadCart();
	}, [url, idUser]);
	const sum = (he) => {
		if (he) {
			const itemsPrice = he.reduce((a, c) => a + c.price * c.qty, 0);
			return new Intl.NumberFormat("it-IT", {
				style: "currency",
				currency: "VND",
			}).format(itemsPrice);
		} else {
			return 0;
		}
	};

	const paypal = () => {
		const urlPaypal = `http://localhost:5000/api/v1/pay/${idUser}`;
		setLoading(true);

		axios
			.post(urlPaypal, { headers: authHeader() })
			.then((res) => {
				console.log(res.data);
				window.location = res.data.forwardLink;
				toast.success("success !!!");
				setLoading(false);
			})
			.catch((err) => {
				console.log("faild", err);
				toast.error("faild");
				setLoading();
			});
	};

	return (
		<>
			<div className="form-payment">
				<div className="desc-order-user">
					<h3>Họ và tên</h3>
					<span>{dataUser.name}</span>
				</div>
				<div className="desc-order-address">
					<h3>Địa chỉ nhận hàng</h3>
					<span>{dataUser.address}</span>
				</div>
				<div className="payment-product">
					<div className="price-product">
						<h3>Tạm tính</h3>
						<span>{sum(data.items)}</span>
					</div>
					<div className="discount-product">
						<h3>Giảm Giá</h3>
						<span>Free Ship</span>
					</div>
				</div>

				<div className="btn-payment-price">
					<button onClick={paypal}>Thanh Toán</button>
				</div>
				<div className="background-loading-center">
					{loading === true && <span>Đang xử lý...</span>}
				</div>
			</div>
		</>
	);
};

export default PaymentProduct;
