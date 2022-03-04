import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_DELETE_RESET } from "../constants/userConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../actions/categoryActions";
import { CATEGORY_DELETE_RESET, CATEGORY_UPDATE_RESET } from "../constants/categoryConstants";

export default function CategoriesScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [categoryItem, setCategoryItem] = useState([])
  const stock = 0;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading } = categoryCreate;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loading: loadingList, error: errorList, categories } = categoriesList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const dispatch = useDispatch();

  const updateHandler = async (cat) => {
    await setCategoryItem(cat);
    // if(!openModalUpdate){
      console.log(categoryItem)
      await setUpdateName(cat.name);
    // }
    await setOpenModalUpdate(true);
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }

    dispatch(listCategories());
  }, [dispatch, successDelete, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    dispatch(createCategory(name, stock));
    dispatch(listCategories());
  };

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };



  const submitUpdateHandler = (e) => {
    e.preventDefault();
    setOpenModalUpdate(!openModalUpdate);
    dispatch(updateCategory({_id: categoryItem._id, name: updateName}));
    console.log('entro sdfgsd');
  }
  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Categorias</h2>
          <div className="buttons">
            <button
              className="btn btn-success mr-10 flex"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-plus"></i> Agregar Categoria
            </button>
            <button className="btn flex">
              <i className="bx bx-download"></i> Exportar
            </button>
          </div>
        </div>
        <div className="card__body">
          <table className="even">
            <thead>
              <tr>
                <th>Categoria</th>
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
                  {categories.map((categorie) => (
                    <tr key={categorie._id}>
                      <td>{categorie.name}</td>
                      <td>{categorie.createdAt.substring(0, 10)}</td>
                      <td>
                        <button
                          onClick={() => updateHandler(categorie)}>
                          <i className="bx bxs-pencil btn-icon"></i>
                        </button>
                        <button>
                          <i
                            className="bx bxs-trash-alt btn-icon"
                            onClick={() => deleteHandler(categorie._id)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
      <div className={openModal ? "modal active" : "modal"}>
        <div className="modal-dialog">
          <div className="card">
            <div className="card__header b-line">
              <h2 className="card__title">Agregar Categoria</h2>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              <h2 className="card__title">Actualizar Categoria</h2>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    placeholder="Nombre"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
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
