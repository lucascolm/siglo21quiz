import preguntas from "./preguntas";
// import XLSX from "xlsx";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = ({usuarios}) => {
  

  const navigate = useNavigate();
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);
  // const user=JSON.parse(localStorage.getItem('user'))
  const user = { puntuacion, ...JSON.parse(localStorage.getItem("user")) };

 

  async function addUser() {
    console.log(user);
    try {
      
      await axios.post(`https://back-cosquin-production.up.railway.app/s21`, user);
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleAnswerSubmit(isCorrect, e) {
    if (isCorrect) setPuntuacion(puntuacion + 1);

    e.target.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
      }
    }, 1000);
  }

  React.useEffect(() => {
    console.log(puntuacion);
  }, [puntuacion]);

  if (isFinished) {
    addUser();

    if (puntuacion >= 3) {
      // handleOnExport()
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Felicitaciones.",
        text: "Obtuviste una puntuacion de: " + puntuacion,
        confirmButtonText: "Volver a jugar",
      }).then((result) => {
        navigate("/");
      });
    } else {
      navigate("/");
      Swal.fire({
        icon: "error",
        title: "Lo sentimos.",
        text: "Obtuviste una putuacion de: " + puntuacion,
        confirmButtonText: "Volver a jugar",
      }).then(
        (result) => {
          navigate("/");
        },
        (error) => {}
      );
    }
    // return(  <div>
    //     <span>
    //       obtuviste {puntuacion} de {preguntas.length}{" "}
    //     </span>
    //     <button onClick={() => (window.location.href = "/")}></button>
    //   </div>)
    // ;
  }
  return (
    <div className="mx-auto w-full h-[100vh] px-4 py-16 sm:px-6 lg:px-8 lg:w-full  xl:w-3/4 bg-[url('https://res.cloudinary.com/do3picw1u/image/upload/v1675781762/TEMPLATE_APP_Mesa_de_trabajo_1_copia_6_scg8hu.jpg')] bg-bottom bg-cover bg-no-repeat ">
      <div className="mt-6  space-y-4 ronded-lg bg-trasnparent backdrop-opacity-50  p-8 shadow-lg lg:col-span-3 lg:p-12 ">
        <div className="min-w-full ">
          <h1 className="text-center text-2xl font-bold text-emerald-700 sm:text-3xl">
            Pregunta {preguntaActual + 1} de {preguntas.length}
          </h1>
        </div>

        <div className="p-8">
          <p className=" text-center text-4xl font-medium">
            {preguntas[preguntaActual].titulo}
          </p>
        </div>

        <div className="w-full flex flex-col justify-between">
          {preguntas[preguntaActual].opciones.map((opcion) => (
            <button
              disabled={isDisabled}
              key={opcion.respuesta}
              onClick={(e) => handleAnswerSubmit(opcion.isCorrect, e)}
              className="block w-full bg-green-200 p-4 text-black font-bold rounded-lg shadow hover:shadow-lg hover:scale-105 my-7"
            >
              {opcion.respuesta}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
