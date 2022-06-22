import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Rate } from "antd";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import authHeader from "../../../service/AuthHeader";
import "./ProductNew.css";
import { Link } from "react-router-dom";

const ProductNew = () => {
	const [newProducts, setNewProducts] = useState([]);
	const url = `${process.env.REACT_APP_API_LOCAL}/api/v1/category/get5ProductsNew`;

	useEffect(() => {
		const loadUser = () => {
			axios
				.get(url, { headers: authHeader() })
				.then((res) => {
					setNewProducts(res.data.products);
					console.log("users: ", res.data.products);
				})
				.catch((err) => console.log(err));
		};
		loadUser();
	}, [url]);
	return (
		<div className="container-slider-product">
			<Swiper
				slidesPerView={4}
				spaceBetween={30}
				loop={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="mySwiper"
			>
				{newProducts &&
					newProducts.map((item, id) => (
						<SwiperSlide>
							{/* <img key={id} src={item.productPicture} alt="" srcset="" /> */}
							<Link to={`product/detail/${item._id}`} replace key={id}>
								<div className="container-recommend-products">
									<div className="recommend-product-image">
										<img
											className="img-recommend-product"
											src={item.productPicture}
											alt=""
										/>
									</div>
									<div className="recommend-product-icon">
										<div>
											<Link to="">{/* <img src={Cart} alt="" /> */}</Link>
										</div>
										<div>
											<Link to="">{/* <img src={Like} alt="" /> */}</Link>
										</div>
										<div>
											<Link to={`product/detail/${item.id}`}>
												{/* <img src={Detail} alt="" /> */}
											</Link>
										</div>
									</div>
									<div className="recommend-product-desc">
										<span>{item.name}</span>
										<Rate
											disabled
											allowHalf
											defaultValue={item.ratingsAverage}
										/>
										<h3 className="price">
											{new Intl.NumberFormat("it-IT", {
												style: "currency",
												currency: "VND",
											}).format(item.price)}
										</h3>
									</div>

									{/* <div className="new-product-icon"></div> */}
								</div>
							</Link>
						</SwiperSlide>
					))}

				{/* <SwiperSlide>
					<img
						src="https://ucarecdn.com/c9c62495-04ca-4db2-b796-5759deae96e0/-/format/auto/-/preview/3000x3000/-/quality/lighter/glorious_gaming_gmmk_pro_gaming_keyboard_4_1728x_1.jpg"
						alt=""
					/>
				</SwiperSlide> */}
				{/* <SwiperSlide>
					<img src={Banner1} alt="" />
				</SwiperSlide> */}
			</Swiper>
		</div>
	);
};

export default ProductNew;
