import React, { useState } from "react";
import * as xlsx from "xlsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Landing = ({ usuarios }) => {
  const navigate = useNavigate();
  const adminPass = "soyadmin";
  const [input, setInput] = useState({
    nombre: "",
    email: "",
  });

  const handleClick = () => {
    if (!input.nombre || !input.email) {
      Swal.fire({
        icon: "error",
        text: "Para continuar complete los campos con tus datos.",
      });
    } else {
      navigate("/game");
      localStorage.setItem("user", JSON.stringify(input));
    }
  };
  const handleSave = async () => {
    try {
      const allUsuarios = await axios.get(
        `https://back-cosquin-production.up.railway.app/s21`
      );
      var wb = xlsx.utils.book_new();
      var workSheet = xlsx.utils.json_to_sheet(allUsuarios.data);
      xlsx.utils.book_append_sheet(wb, workSheet, "participantes");
      xlsx.writeFile(wb, "myExcel.xlsx");
    } catch (error) {
      console.log(error.message);
    }
   

  };
  const showAlert = () => {
    Swal.fire({
      icon: "info",
      title: "Ingrese contraseña para guardar datos",
      html: `
      <input type="password" id="password" class="swal2-input" placeholder="Password" name="password" >`,
      showCloseButton: true,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#28B0A2",
      focusConfirm: false,
      preConfirm: () => {
        const password = Swal.getPopup().querySelector("#password").value;
        if (!password) {
          Swal.showValidationMessage(`Ingrese su contraseña`);
        } else if (password !== adminPass) {
          Swal.showValidationMessage(`Verifique  datos ingresados`);
        }
        return { password: password };
      },
    }).then((result) => handleSave());
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex  mx-auto bg-[url('https://res.cloudinary.com/do3picw1u/image/upload/v1675898962/rapidito_q2fe3q.jpg')]  bg-cover bg-no-repeat h-[100vh] text-white max-w-screen-xl px-4  py-18  lg:h-screen ">
      <div className="mx-auto max-w-3xl mt-10 text-center text-black font-semibold">
        <h1 className="bg-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Responde la siguente
          <span className="sm:block"> encuesta del medio ambiente </span>
        </h1>

        <div>
          <form
            action=""
            className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl bg-emerald-300"
          >
            <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
              Completa los campos con tus datos y empeza a jugar
            </p>
            {/* <p className="text-lg font-semibold">Sing in to your account</p> */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  value={input.email}
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Nombre Completo
              </label>

              <div className="relative mt-1">
                <input
                  type="text"
                  value={input.nombre}
                  name="nombre"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter name"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <span onClick={handleClick}>
            <span className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
              Comenzar juego
            </span>
          </span>
          <button
            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={showAlert}
          >
            guardar datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
