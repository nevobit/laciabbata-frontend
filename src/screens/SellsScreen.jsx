import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  deleteProduct,
} from "../actions/productActions";
import { PRODUCT_DELETE_REQUEST } from "../constants/productConstants";
import DivisaFormater from "../components/DivisaFormater";
import { listSells } from "../actions/sellActions";

export default function ProductsScreen() {
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [priceDetal, setPriceDetal] = useState("");
  const [priceMajor, setPriceMajor] = useState("");
  const [stock, setStock] = useState("");

  const productCreate = useSelector((state) => state.productCreate);
  const {  loading } = productCreate;

  const sellsList = useSelector((state) => state.sellsList);
  const { loading: loadingList, error: errorList, sells } = sellsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const categoriesList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingListCategories,
    categories,
  } = categoriesList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
    }
    dispatch(listSells());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Ventas</h2>
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
          {!loadingList && sells.length === 0 ? (
            <MessageBox variant="info">No Hay Ventas</MessageBox>
          ) : (
            <table className="even">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Cliente</th>
                  <th>Forma de pago</th>
                  <th>Total</th>
                  <th>Fecha</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loading && <LoadingBox></LoadingBox>}
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
                    {sells.map((sell) => (
                      <tr key={sell._id}>
                        <td>{sell.code}</td>
                        <td>{sell.cliente}</td>
                        <td>{sell.paymentMethod}</td>
                        <td>
                          <DivisaFormater
                            value={sell.itemsPrice}
                          ></DivisaFormater>
                        </td>
                        <td>{sell.createdAt.substring(0, 10)}</td>
                        <td>
                          <button>
                            <i className="bx bxs-pencil btn-icon"></i>
                          </button>
                          <button>
                            <i
                              className="bx bxs-trash-alt btn-icon"
                              onClick={() => deleteHandler(sell._id)}
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
                  {loadingListCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <select
                      name=""
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  )}
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
                    placeholder="Precio al. detal"
                    value={priceDetal}
                    onChange={(e) => setPriceDetal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="price"
                    placeholder="Precio al por mayor"
                    value={priceMajor}
                    onChange={(e) => setPriceMajor(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer flex center">
              <button className="btn btn-success mr-10" >
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
