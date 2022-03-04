import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../actions/productActions";
import { PRODUCT_DELETE_REQUEST, PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import DivisaFormater from "../components/DivisaFormater";
import { listCategories } from "../actions/categoryActions";

export default function ProductsScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pasteleria");
  const [code, setCode] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [priceDetal, setPriceDetal] = useState("");
  const [priceMajor, setPriceMajor] = useState("");
  const [stock, setStock] = useState("");

  const [nameUpdate, setNameUpdate] = useState("");
  const [categoryUpdate, setCategoryUpdate] = useState("Pasteleria");
  const [buyPriceUpdate, setBuyPriceUpdate] = useState(0);
  const [codeUpdate, setCodeUpdate] = useState(0);
  const [priceDetalUpdate, setPriceDetalUpdate] = useState("");
  const [priceMajorUpdate, setPriceMajorUpdate] = useState("");
  const [stockUpdate, setStockUpdate] = useState("");
  const [productItem, setProductItem] = useState([])

  const productCreate = useSelector((state) => state.productCreate);
  const { loading } = productCreate;

  const productsList = useSelector((state) => state.productsList);
  const { loading: loadingList, error: errorList, products } = productsList;

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

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  const updateHandler = async (pro) => {
    await setProductItem(pro);
    await setNameUpdate(pro.name);
    await setCategoryUpdate(pro.category);
    await setBuyPriceUpdate(pro.buyPrice);
    await setCodeUpdate(pro.code);
    await setPriceDetalUpdate(pro.priceDetal);
    await setPriceMajorUpdate(pro.priceMajor);
    await setStockUpdate(pro.stock);
    await setOpenModalUpdate(true);
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    dispatch(listProducts());
    dispatch(listCategories());
  }, [dispatch, successDelete, successUpdate]);


  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(
      createProduct(
        name,
        category,
        code,
        buyPrice,
        priceDetal,
        priceMajor,
        stock
      )
    );
    dispatch(listProducts());
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };


  const submitUpdateHandler = (e) => {
    e.preventDefault();
    setOpenModalUpdate(!openModalUpdate);
    dispatch(updateProduct({_id: productItem._id, name: nameUpdate,
      category : categoryUpdate,
      buyPrice: buyPriceUpdate,
      code: codeUpdate,
      priceDetal: priceDetalUpdate,
      priceMajor: priceMajorUpdate,
      stock: stockUpdate }));
    console.log('entro gsd');
  }

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Productos</h2>
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
                  <th>Precio Detal</th>
                  <th>Precio Mayor</th>
                  <th>Fecha</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {loadingListCategories && <LoadingBox></LoadingBox>}
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
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>{product.buyPrice}</td>
                        <td>
                          <DivisaFormater
                            value={product.priceDetal}
                          ></DivisaFormater>
                        </td>
                        <td>
                          <DivisaFormater
                            value={product.priceMajor}
                          ></DivisaFormater>
                        </td>
                        <td>{product.createdAt.substring(0, 10)}</td>
                        <td>
                          <button onClick={() => updateHandler(product)}>
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
                        <option key={category._id} value={category.name}>{category.name}</option>
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
      <div className={openModalUpdate ? "modal active" : "modal"}>
        <div className="modal-dialog">
          <div className="card">
            <div className="card__header b-line">
              <h2 className="card__title">Actualizar Producto</h2>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Descripcion"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="code"
                    placeholder="Codigo"
                    value={codeUpdate}
                    onChange={(e) => setCodeUpdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  {loadingListCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <select
                      name=""
                      id="category"
                      value={categoryUpdate}
                      onChange={(e) => setCategoryUpdate(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="stock"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="buyPrice"
                    placeholder="Precio Compra"
                    value={buyPriceUpdate}
                    onChange={(e) => setBuyPriceUpdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="price"
                    placeholder="Precio al. detal"
                    value={priceDetalUpdate}
                    onChange={(e) => setPriceDetalUpdate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="price"
                    placeholder="Precio al por mayor"
                    value={priceMajorUpdate}
                    onChange={(e) => setPriceMajorUpdate(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer flex center">
              <button className="btn btn-success mr-10" onClick={(e) => submitUpdateHandler(e)}>
                Guardar
              </button>
              <button className="btn" onClick={() => setOpenModalUpdate(!openModalUpdate)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
