import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers, register } from "../actions/userActions";
import { USER_DELETE_RESET, USER_REGISTER_RESET } from "../constants/userConstants";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Users() {
  const [openModal, setOpenModal] = useState(false);

  // ADD USER
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error: errorRegister, success: successRegister } = userRegister;

  const usersList = useSelector((state) => state.usersList);
  const { loading: loadingList, error: errorList, users } = usersList;

  const usersDelete = useSelector((state) => state.usersDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = usersDelete;

  const dispatch = useDispatch();

  useEffect(() =>{
    if(successRegister){
      dispatch({type: USER_REGISTER_RESET})
    }
      if(successDelete){
          dispatch({type: USER_DELETE_RESET})
      }
      dispatch(listUsers());
    }, [dispatch, successDelete, successRegister]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        setOpenModal(!openModal);
        dispatch(register(name, username, password));
        dispatch(listUsers());
  };

  const deleteHandler = (id) => {
      dispatch(deleteUser(id));
  }

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Usuarios</h2>
          <div className="buttons">
            <button
              className="btn btn-success mr-10 flex"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-plus"></i> Agregar Usuario
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
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading && <LoadingBox></LoadingBox>}
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) :
            errorList? <MessageBox variant="danger">{errorList}</MessageBox> : (
                <>
              <tbody>
                {users.map((user) => (
                    <tr>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.createdAt.substring(0, 10)}</td>
                    <td>
                      <button>
                        <i className="bx bxs-pencil btn-icon"></i>
                      </button>
                      <button>
                        <i className="bx bxs-trash-alt btn-icon" onClick={() => deleteHandler(user._id)}></i>
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
              <h2 className="card__title">Agregar Usuario</h2>
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
                <div className="form-group">
                  <input
                    type="text"
                    id="username"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
