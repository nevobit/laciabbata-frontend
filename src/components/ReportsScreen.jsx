import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSells } from "../actions/sellActions";
import LoadingBox from "./LoadingBox";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../styles/basics.css";
import DivisaFormater from "./DivisaFormater";
import { useState } from "react";
import { listExpenses } from "../actions/expenseActions";
export default function ReportsScreen() {
  const [date, setDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const sellsList = useSelector((state) => state.sellsList);
  const { loading: loadingSells, sells } = sellsList;

  const expensesList = useSelector((state) => state.expensesList);
  const { loading: loadingExpense, error: errorExpense, expenses } = expensesList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSells());
    dispatch(listExpenses());
  }, [dispatch]);

  const dateSelect = [];
  const todaySelect = [];
  const monthSelect = [];
  const d = new Date();

  let todayDate =
    (
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      "0" +
      d.getDate()
    ).slice(-2) + 1;
  let monthDate =
    d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + "01";
  let endMonthuNmber = new Date(d.getFullYear(), d.getMonth(), 0);
  let monthEndDate =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    endMonthuNmber.getDate();

  if (!loadingSells) {
    sells.map((sell) => {
        console.log(sell)
      const f1 = new Date(date);
      const f2 = new Date(endDate);
      const f3 = new Date(sell.createdAt.substring(0, 10));

      const tf1 = new Date(d);
      const tf2 = new Date(sell.createdAt.substring(0, 10));

      const mf1 = new Date(monthDate);
      const mf2 = new Date(monthEndDate);

      if (f3 >= f1 && f3 <= f2) {
        dateSelect.push(sell);
      }

      tf1.setHours(0, 0, 0, 0);
      tf2.setHours(0, 0, 0, 0);
      if (tf1.getTime() == tf2.getTime()) {
        todaySelect.push(sell);
      }

      if (f3 >= mf1 && f3 <= mf2) {
        monthSelect.push(sell);
      }

    });
  }

  const edateSelect = [];
  const etodaySelect = [];
  const emonthSelect = [];
  if (!loadingExpense) {
    expenses.map((expense) => {
      const ef1 = new Date(date);
      const ef2 = new Date(endDate);
      const ef3 = new Date(expense.createdAt.substring(0, 10));

      const etf1 = new Date(d);
      const etf2 = new Date(expense.createdAt.substring(0, 10));

      const emf1 = new Date(monthDate);
      const emf2 = new Date(monthEndDate);

      if (ef3 >= ef1 && ef3 <= ef2) {
        edateSelect.push(expense);
      }

      etf1.setHours(0, 0, 0, 0);
      etf2.setHours(0, 0, 0, 0);
      if (etf1.getTime() == etf2.getTime()) {
        etodaySelect.push(expense);
      }

      if (ef3 >= emf1 && ef3 <= emf2) {
        emonthSelect.push(expense);
      }

    });
  }
  return (
    <div className="card info">
      <div className="card__header">
        <h2 className="card__title">Reportes</h2>
        <div className="buttons">
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name=""
              id=""
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              name=""
              id=""
            />

            {/* <DatePickerComponent placeholder="Seleccione una fecha" value={date} onChange={(e) => setDate(e.target.value)}></DatePickerComponent> */}
          </div>
        </div>
      </div>

      {loadingSells ? (
        <LoadingBox></LoadingBox>
      ) : (
        <>
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Reportes Por Fecha</h2>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Ventas</th>
                    <th>Gastos</th>
                    <th>Pago Nomina</th>
                    <th>Ganancias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {date == 0 || endDate == 0 ? (
                      <td>
                    <h2>Total</h2>
                      <DivisaFormater
                        value={sells.reduce(
                          (a, c) => a + Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      <h2>Transferencia</h2>
                      <DivisaFormater
                        value={sells.filter((item) => item.paymentMethod == 'Transferencia')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                        <h2>Efectivo</h2>
                      <DivisaFormater
                        value={sells.filter((item) => item.paymentMethod == 'Efectivo')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      </td>
                    ) : (
                      <td>
                    <h2>Total</h2>
                      <DivisaFormater
                        value={dateSelect.reduce(
                          (a, c) => a + Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      <h2>Transferencia</h2>
                      <DivisaFormater
                        value={dateSelect.filter((item) => item.paymentMethod == 'Transferencia')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                        <h2>Efectivo</h2>
                      <DivisaFormater
                        value={dateSelect.filter((item) => item.paymentMethod == 'Efectivo')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      </td>
                    )}
                                        {date == 0 || endDate == 0 ? (
                      <td>
                        <DivisaFormater
                          value={expenses.reduce(
                            (a, c) => a + Number(c.value) * 1,
                            0
                          )}
                        ></DivisaFormater>
                      </td>
                    ) : (
                      <td>
                        <DivisaFormater
                          value={edateSelect.reduce(
                            (a, c) => a + Number(c.value) * 1,
                            0
                          )}
                        ></DivisaFormater>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              <div></div>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Reporte de hoy</h2>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Ventas</th>
                    <th>Gastos</th>
                    <th>Pago Nomina</th>
                    <th>Ganancias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <h2>Total</h2>
                      <DivisaFormater
                        value={todaySelect.reduce(
                          (a, c) => a + Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      <h2>Transferencia</h2>
                      <DivisaFormater
                        value={todaySelect.filter((item) => item.paymentMethod == 'Transferencia')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                        <h2>Efectivo</h2>
                      <DivisaFormater
                        value={todaySelect.filter((item) => item.paymentMethod == 'Efectivo')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                    <td>
                      <DivisaFormater
                        value={etodaySelect.reduce(
                          (a, c) => a + Number(c.value) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div></div>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Reporte del Mes</h2>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Ventas</th>
                    <th>Gastos</th>
                    <th>Pago Nomina</th>
                    <th>Ganancias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    <h2>Total</h2>
                      <DivisaFormater
                        value={monthSelect.reduce(
                          (a, c) => a + Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      <h2>Transferencia</h2>
                      <DivisaFormater
                        value={monthSelect.filter((item) => item.paymentMethod == 'Transferencia')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                        <h2>Efectivo</h2>
                      <DivisaFormater
                        value={monthSelect.filter((item) => item.paymentMethod == 'Efectivo')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                    <td>
                      <DivisaFormater
                        value={emonthSelect.reduce(
                          (a, c) => a + Number(c.value) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div></div>
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Reporte Total</h2>
            </div>
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Ventas</th>
                    <th>Gastos</th>
                    <th>Pago Nomina</th>
                    <th>Ganancias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                        <h2>Total</h2>
                      <DivisaFormater
                        value={sells.reduce(
                          (a, c) => a + Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                      <h2>Transferencia</h2>
                      <DivisaFormater
                        value={sells.filter((item) => item.paymentMethod == 'Transferencia')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                        <h2>Efectivo</h2>
                      <DivisaFormater
                        value={sells.filter((item) => item.paymentMethod == 'Efectivo')
                            .reduce(
                          (a, c) => a +  Number(c.itemsPrice) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                    <td>
                      <DivisaFormater
                        value={expenses.reduce(
                          (a, c) => a + Number(c.value) * 1,
                          0
                        )}
                      ></DivisaFormater>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
