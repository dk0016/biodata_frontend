import { useState, useEffect, useRef } from "react";
import "./App.css";
import service from "./service.js";
import { useNavigate } from "react-router-dom";
import Tostification from "./helper/toast";
import { Modal, Button } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";
const data = {
  countries: [
    {
      name: "Germany",
      states: [
        {
          name: "A",
          cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
        },
      ],
    },
    { name: "Spain", states: [{ name: "B", cities: ["Barcelona"] }] },

    { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] }] },
    {
      name: "Mexico",
      states: [{ name: ["D", "F", "H"], cities: ["Puebla"] }],
    },
    {
      name: "India",
      states: [
        { name: "E", cities: ["Delhi", "Kolkata", "Mumbai", "Bangalore"] },
      ],
    },
  ],
};

function App() {
  const navigate = useNavigate();
  const toastRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [table, setTable] = useState([]);
  const [formaction, setFormaction] = useState("");
  const [formIndex, setFormIndex] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const availableState = data.countries.find((c) => c.name === selectedCountry);
  const availableCities = availableState?.states?.find(
    (s) => s.name === selectedState
  );
  useEffect(() => {
    getTable();
  }, []);
  const logoutClear = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const clearField = () => {
    setFormIndex("");
    setFormaction("");
    setName("");
    setEmail("");
    setPassword("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
  };
  const deleteData = (item) => {
    console.log(item);
    service
      .deleteBiodata(item.id)
      .then((res) => {
        getTable();
        toastRef.current.toastSuccess("Data Deleted successfully");
      })
      .catch((err) => {
        toastRef.current.toastError(err.message);
      });
  };

  const EditData = (Type, item) => {
    setFormIndex(item.id);
    setFormaction(Type);
    setName(item.name);
    setEmail(item.email);
    setPassword(item.password);
    setSelectedCountry(item.country);
    setSelectedState(item.state);
    setSelectedCity(item.city);
    handleShow();
  };
  const getTable = () => {
    service
      .getBiodata()
      .then((res) => {
        console.log(res.data);
        setTable([...res.data]);
      })
      .catch((err) => {
        toastRef.current.toastError(err);
      });
  };
  const biodata_submit = (e) => {
    e.preventDefault();
    const bodyData = {
      name: name,
      email: email,
      password: password,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    };
    if (formaction === "EDIT") {
      service.editBiodata(bodyData, formIndex).then((res) => {
        console.log(res);
        getTable();
        clearField();
        toastRef.current.toastSuccess("Data Edited successfully");
      });
    } else {
      // setTable([...table, bodyData]);
      service
        .addBiodata(bodyData)
        .then((res) => {
          getTable();
          clearField();
          toastRef.current.toastSuccess("Data added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Confirmation Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <p className="fontweight">
                Are you sure you want to Edit this data
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <Button
                variant="danger"
                onClick={() => {
                  handleClose();
                  clearField();
                }}
              >
                Cancel
              </Button>
              <Button variant="success" onClick={handleClose}>
                Edit
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
      <div className="d-flex justify-content-end me-4 mt-1">
        <BoxArrowLeft
          fontSize="2.5rem"
          className="changeColor"
          onMouseOver={({ target }) => (target.style.svg = "blue")}
          onMouseOut={({ target }) => (target.style.svg = "red")}
          onClick={logoutClear}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="d-flex justify-content-center mt-2">
        <h3>CRUD OPERATION {formaction}</h3>
      </div>

      <div className="d-flex justify-content-center maindiv">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded cardheight">
          <form>
            <div className="mb-3 ps-4 pe-4">
              <strong>Name</strong>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your mobile"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>Email address</strong>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>Password</strong>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>Country</strong>
              <select
                className="form-select"
                placeholder="select your Country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option>Choose country</option>
                {data.countries.map((value, key) => {
                  return (
                    <option value={value.name} key={key}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>State</strong>
              <select
                className="form-select"
                placeholder="select your district"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option>choose state</option>
                {availableState?.states.map((e, key) => {
                  return (
                    <option value={e.name} key={key}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3 ps-4 pe-4">
              <strong>City</strong>
              <select
                className="form-select"
                placeholder="select your city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option>choose city</option>
                {availableCities?.cities.map((e, key) => {
                  return (
                    <option value={e.name} key={key}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary buttonwidth"
                onClick={(e) => biodata_submit(e)}
              >
                Submit
              </button>
            </div>
          </form>
          <Tostification ref={toastRef}></Tostification>
        </div>
      </div>
      <div className="container px-4">
        <div className="table-responsive">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.country}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={() => {
                          EditData("EDIT", item, index);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteData(item);
                        }}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
