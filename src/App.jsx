import Header from "./components/Header";
import { useState, useEffect } from "react";
import { db } from "./data/db.js";
import Guitar from "./components/Guitar";
//imports
function App() {
  const [data, setData] = useState(db);

  const [auth, setAuth] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  function handlerClick(item) {
    const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);
    //console.log(guitarExists);
    //setCart((prevCart) => [...cart, { ...item }]);

    //console.log(cart);
    if (guitarExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[guitarExists].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  }

  function calculateTotal(){

return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}


  useEffect(() => {
    console.log(cart);
  }, [cart]);

  /*
  data.map((guitar) => {
    console.log("guitarra encontrada");
  });
  */
  //UseEffect
  /*
  useEffect(() => {
    //Accion al cargar el componente
    console.log("Componente listo");
  }, []);
  useEffect(() => {
    //Accion al cambio de una variable
    console.log("Token cambio ");
  }, [auth]);
  setTimeout(() => {
    setAuth(true);
    setTotal(1000);
  }, 3000);
*/

  return (
    <>
      <Header cart={cart} total={calculateTotal()} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar  key = {guitar.id}
            guitar={guitar} handlerClick={handlerClick}  />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;