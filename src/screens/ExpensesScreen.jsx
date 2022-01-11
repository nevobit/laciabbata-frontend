import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createExpense, deleteCategory, deleteExpense, listExpenses } from "../actions/expenseActions";
import { EXPENSE_CREATE_RESET, EXPENSE_DELETE_RESET } from "../constants/expenseConstants";
import swal from "sweetalert";

export default function ExpensesScreen() {
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);

  const expenseCreate = useSelector((state) => state.expenseCreate);
  const { loading, success: successCreate } = expenseCreate;

  const expensesList = useSelector((state) => state.expensesList);
  const { loading: loadingList, error: errorList, expenses } = expensesList;

  const expenseDelete = useSelector((state) => state.expenseDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = expenseDelete;

  const dispatch = useDispatch();

  useEffect(() =>{

    if(successCreate){
      dispatch({type: EXPENSE_CREATE_RESET})
    }
      if(successDelete){
          dispatch({type: EXPENSE_DELETE_RESET})
      }
      dispatch(listExpenses());
    }, [dispatch, successCreate, successDelete]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        setOpenModal(!openModal);
        dispatch(createExpense(name, value));
  };

  const deleteHandler = (expense) => {
    swal('Seguro que quieres borrar ' + expense.name + '?', {
      icon: 'warning',
      buttons: ['Cancelar', 'Si, Borrar!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + expense.name + ' Borrado!', {
          icon: 'success',
        });
        dispatch(deleteExpense(expense._id));
      }
    });
  }

  return (
    <>
      <div className="card info">
        <div className="card__header">
          <h2 className="card__title">Gastos</h2>
          <div className="buttons">
            <button
              className="btn btn-success mr-10 flex"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-plus"></i> Agregar Gasto
            </button>
            <button className="btn flex">
              <i className="bx bx-download"></i> Exportar
            </button>
          </div>
        </div>
        <div className="card__body">
          {loading && <LoadingBox></LoadingBox>}
        {!loadingList && expenses.length === 0 ? (
                  <MessageBox variant="info">No Hay Gastos</MessageBox>
                ) : (
          <table className="even">
            <thead>
              <tr>
                <th>Gasto</th>
                <th>Valor</th>
                <th>Fecha</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* {loadingDelete && <LoadingBox></LoadingBox>} */}
            {/* {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) :
            errorList? <MessageBox variant="danger">{errorList}</MessageBox> : (
              <>
              <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id}>
                    <td>{expense.name}</td>
                    <td>{expense.value}</td>
                    <td>{expense.createdAt.substring(0, 10)}</td>
                    <td>
                      <button>
                        <i className="bx bxs-pencil btn-icon"></i>
                      </button>
                      <button>
                        <i className="bx bxs-trash-alt btn-icon" onClick={() => deleteHandler(expense)}></i>
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
              <h2 className="card__title">Agregar Categoria</h2>
            </div>
            <div className="card__body">
              <form action="" >
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
                    id="value"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer flex center">
              <button className="btn btn-success mr-10" onClick={submitHandler} >
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
