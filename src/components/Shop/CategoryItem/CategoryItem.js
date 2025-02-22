import React, { useEffect, useState } from "react";
import ItemProduct from "../../Product/ItemProduct/ItemProduct.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../../service/AuthHeader.js";
import { Pagination } from "antd";
import List from "../../../images/options-lines.png";
import Net from "../../../images/category.png";
import Filter from "../../../images/Filter.png";
import Search from "../../../images/searchProduct.png";
import Nodata from "../../../images/ic_empty_cate.png";
import "antd/dist/antd.css";
import "./CategoryItem.css";
import SkeletonCard from "../../../common/SkeletonCard/index.js";

const CategoryItem = () => {
	const { id } = useParams();
	const [dataProduct, setDataProduct] = useState([]);
	const [size, setSize] = useState([]);
	const [pageCurrent, setPageCurrent] = useState();
	const [sort, setSort] = useState("-1");
	const [loading, setLoading] = useState(false);

	const handelPagination = (page) => {
		setPageCurrent(page);
		console.log("page: ", page);
	};
	const url = `${process.env.REACT_APP_API_LOCAL}/api/v1/category/paginationSort/${id}/`;
	useEffect(() => {
		const loadProduct = () => {
			setLoading(true);
			axios
				.get(
					url,
					{
						params: { page: pageCurrent, size: 8, sort: sort },
					},
					{ headers: authHeader() }
				)
				.then((res) => {
					setDataProduct(res.data.sortProduct);
					setSize(res.data);

					console.log("dataProduct", res.data.sortProduct);
					console.log("pages size: ", res.data);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setLoading(false);
				});
		};
		loadProduct();
	}, [url, pageCurrent, sort]);
	// if (dataProduct.length === 0) {
	// 	console.log("show no data ");
	// }
	// const maxPrice = () => {
	// 	const url = `http://localhost:5000/api/v1/category/sortMinMax/${id}`;
	// 	axios
	// 		.get(url, { headers: authHeader() })
	// 		.then((res) => {
	// 			setDataProduct(res.data.sortProduct);
	// 			console.log("min to max: ", res.data.sortProduct);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// const minPrice = () => {
	// 	const url = `http://localhost:5000/api/v1/category/sortMaxMin/${id}`;
	// 	axios
	// 		.get(url, { headers: authHeader() })
	// 		.then((res) => {
	// 			setDataProduct(res.data.sortProduct);
	// 			console.log("max to min: ", res.data.sortProduct);
	// 		})
	// 		.catch((err) => console.log(err));
	// };
	const handleChange = (item) => {
		setSort(item);
		// let url = `http://localhost:5000/api/v1/category/paginationSort/${id}/`;
		// axios
		// 	.get(
		// 		url,
		// 		{
		// 			params: {
		// 				page: pageCurrent,
		// 				size: 4,
		// 				sort: item,
		// 			},
		// 		},
		// 		{ headers: authHeader() }
		// 	)
		// 	.then((res) => {
		// 		setDataProduct(res.data.sortProduct);
		// 		setSize(res.data);
		// 		console.log("max to min: ", res.data.sortProduct);
		// 	})
		// 	.catch((err) => console.log(err));
		// if (item === 1) {
		// 	let url = `${process.env.REACT_APP_API_LOCAL}/api/v1/category/sortMaxMin/${id}`;
		// }
		// if (item === 2) {
		// 	let url = `${process.env.REACT_APP_API_LOCAL}/api/v1/category/sortMinMax/${id}`;
		// 	axios
		// 		.get(url, { headers: authHeader() })
		// 		.then((res) => {
		// 			setDataProduct(res.data.sortProduct);
		// 			console.log("min to max: ", res.data.sortProduct);
		// 		})
		// 		.catch((err) => console.log(err));
		// }
	};
	const [filterInput, setFilterInput] = useState("");
	const searchText = (e) => {
		setFilterInput(e.target.value);
	};
	const filterData = () => {
		if (filterInput === "") return dataProduct;

		if (isNaN(filterInput)) {
			return dataProduct.filter(({ name }) => name.includes(filterInput));
		}
		return dataProduct.filter(({ price }) => price <= filterInput);
	};

	//toggle
	const [toggleType, setToggleType] = useState("net");
	const toggleProduct = (item) => {
		setToggleType(item);
	};

	return (
		<div>
			{dataProduct && dataProduct.length > 0 && (
				<div className="menu-product-item">
					<div className="handel-item-product">
						<div className="simple-search">
							<img src={Search} alt="" />
							<input
								onChange={(e) => searchText(e)}
								type="text"
								placeholder="Tìm kiếm sản phẩm"
							></input>
						</div>
						<div className="handel-product">
							<div
								onClick={() => toggleProduct("list")}
								className="layout-icon layout-list"
							>
								<img src={List} alt="" />
							</div>
							<div
								onClick={() => toggleProduct("net")}
								className="layout-icon layout-net"
							>
								<img src={Net} alt="" />
							</div>

							<div className="dropdown">
								<div className="dropdown__select">
									<span className="dropdown__selected">Sắp xếp</span>
									<img className="dropdown__icon" src={Filter} alt="" />
								</div>
								<ul className="dropdown__list">
									<div
										onClick={() => handleChange(-1)}
										className="dropdown__item"
									>
										<span className="dropdown__text">Cao đến thấp</span>
									</div>
									<div
										onClick={() => handleChange(1)}
										className="dropdown__item"
									>
										<span className="dropdown__text">Thấp đến cao</span>
									</div>
								</ul>
							</div>
						</div>
					</div>
					<div
						className={
							toggleType === "net"
								? "show-item-product"
								: "show-item-product-list"
						}
					>
						{filterData().map((item, id) => (
							<div key={id} className="item-flex">
								<ItemProduct toggleType={toggleType} data={item} />
							</div>
						))}
					</div>
					<div className="pagination-list">
						{size && size.pages && (
							<Pagination
								current={size.current}
								pageSize={size.pages}
								onChange={(page) => handelPagination(page)}
								total={parseInt(size.pages) * parseInt(size.pages)}
							/>
						)}
						{}
					</div>
				</div>
			)}
			{loading && <SkeletonCard />}
			{!loading && dataProduct.length === 0 && (
				<div className="menu-product-item">
					<div className="handel-item-product">
						<img className="nodata-product" src={Nodata} alt="" />
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
