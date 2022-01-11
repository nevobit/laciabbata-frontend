import React from 'react'

export default function ProductsLowScreen() {
    return (
        <div>
            
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import { PRODUCT_DELETE_REQUEST } from "../constants/productConstants";
import DivisaFormater from "../components/DivisaFormater";

export default function ProductsLo0wScreen() {
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const productCreate = useSelector((state) => state.productCreate);
  const { product, loading, error } = productCreate;

  const productsList = useSelector((state) => state.productsList);
  const { loading: loadingList, error: errorList, products } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
    }
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createProduct(name, category, code, buyPrice, price, stock));
    dispatch(listProducts());
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Productos de Baja</h2>
          <div className="buttons">
            <button
              className="btn btn-success mr-10 flex"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-plus"></i> Agregar Producto
            </button>
            <button className="btn flex">
              <i className="bx bx-download"></i> Exportar
            </button>
          </div>
        </div>
        <div className="card__body">
        {!loadingList && products.length === 0 ? (
                  <MessageBox variant="info">No Hay Productos</MessageBox>
                ) : (
          <table className="even">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Description</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Fecha</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
              <MessageBox variant="danger">{errorDelete}</MessageBox>
            )}
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) : errorList ? (
              <MessageBox variant="danger">{errorList}</MessageBox>
            ) : (
              <>
               
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>{product.buyPrice}</td>
                        <td><DivisaFormater value = {product.price}></DivisaFormater></td>
                        <td>{product.createdAt.substring(0, 10)}</td>
                        <td>
                          <button>
                            <i className="bx bxs-pencil btn-icon"></i>
                          </button>
                          <button>
                            <i
                              className="bx bxs-trash-alt btn-icon"
                              onClick={() => deleteHandler(product._id)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              
              </>
            )}
          </table>
            )}
        </div>
      </div>
      <div className={openModal ? "modal active" : "modal"}>
        <div className="modal-dialog">
          <div className="card">
            <div className="card__header b-line">
              <h2 className="card__title">Agregar Producto</h2>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Descripcion"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="code"
                    placeholder="Codigo"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="category"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="buyPrice"
                    placeholder="Precio Compra"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="price"
                    placeholder="Precio Venta"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer flex center">
              <button className="btn btn-success mr-10" onClick={submitHandler}>
                Guardar
              </button>
              <button className="btn" onClick={() => setOpenModal(!openModal)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
