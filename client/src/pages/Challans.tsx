import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import API from "../services/api";



export default function Challans() {

  const [customers, setCustomers] = useState<any[]>([]);

  const [products, setProducts] = useState<any[]>([]);

  const [challans, setChallans] = useState<any[]>([]);



  const [customer, setCustomer] = useState("");

  const [product, setProduct] = useState("");

  const [quantity, setQuantity] = useState("");



  const [editingId, setEditingId] = useState("");



  useEffect(() => {

    fetchCustomers();

    fetchProducts();

    fetchChallans();

  }, []);



  const fetchCustomers = async () => {

    try {

      const res = await API.get("/customers");

      setCustomers(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const fetchProducts = async () => {

    try {

      const res = await API.get("/products");

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const fetchChallans = async () => {

    try {

      const res = await API.get("/challans");

      setChallans(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const clearForm = () => {

    setCustomer("");

    setProduct("");

    setQuantity("");

    setEditingId("");

  };



  const handleSave = async () => {

    if (!customer || !product || !quantity) {

      alert("Please fill all fields");

      return;

    }



    const selectedProduct = products.find(

      (p: any) => p._id === product

    );



    try {

      const data = {

        customer,

        products: [

          {

            product,

            quantity: Number(quantity),

            price: selectedProduct.price,

          },

        ],

      };



      if (editingId) {

        await API.put(`/challans/${editingId}`, data);

        alert("Challan Updated Successfully");

      } else {

        await API.post("/challans", data);

        alert("Challan Created Successfully");

      }



      clearForm();

      fetchChallans();

    } catch (err: any) {

      console.log(err);

      alert(err.response?.data?.message || "Error");

    }

  };



  const handleDelete = async (id: string) => {

    if (!window.confirm("Delete this challan?")) return;



    try {

      await API.delete(`/challans/${id}`);

      alert("Challan Deleted Successfully");

      fetchChallans();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };



  const handleEdit = (item: any) => {

    setEditingId(item._id);

    setCustomer(item.customer._id);

    setProduct(item.products[0].product._id);

    setQuantity(item.products[0].quantity.toString());

  };



  return (

    <>

      <Navbar />



      <div

        style={{

          marginLeft: "260px",

          padding: "30px",

          background: "#f4f7fb",

          minHeight: "100vh",

        }}

      >

        <h1

          style={{

            color: "#1e293b",

            marginBottom: "25px",

          }}

        >

          Challan Management

        </h1>



        <div

          style={{

            background: "#ffffff",

            width: "450px",

            padding: "25px",

            borderRadius: "12px",

            boxShadow: "0 4px 12px rgba(0,0,0,.08)",

            marginBottom: "30px",

          }}

        >                                                                                                                                                    <select

            value={customer}

            onChange={(e) => setCustomer(e.target.value)}

            style={{

              width: "100%",

              padding: "12px",

              marginBottom: "15px",

              borderRadius: "8px",

              border: "1px solid #ccc",

            }}

          >

            <option value="">Select Customer</option>



            {customers.map((c: any) => (

              <option key={c._id} value={c._id}>

                {c.name}

              </option>

            ))}

          </select>



          <select

            value={product}

            onChange={(e) => setProduct(e.target.value)}

            style={{

              width: "100%",

              padding: "12px",

              marginBottom: "15px",

              borderRadius: "8px",

              border: "1px solid #ccc",

            }}

          >

            <option value="">Select Product</option>



            {products.map((p: any) => (

              <option key={p._id} value={p._id}>

                {p.name}

              </option>

            ))}

          </select>



          <input

            type="number"

            placeholder="Quantity"

            value={quantity}

            onChange={(e) => setQuantity(e.target.value)}

            style={{

              width: "100%",

              padding: "12px",

              marginBottom: "15px",

              borderRadius: "8px",

              border: "1px solid #ccc",

            }}

          />



          <button

            onClick={handleSave}

            style={{

              background: editingId ? "#f59e0b" : "#2563eb",

              color: "#fff",

              border: "none",

              padding: "12px 25px",

              borderRadius: "8px",

              cursor: "pointer",

            }}

          >

            {editingId ? "Update Challan" : "Create Challan"}

          </button>



          {editingId && (

            <button

              onClick={clearForm}

              style={{

                marginLeft: "10px",

                background: "#6b7280",

                color: "#fff",

                border: "none",

                padding: "12px 25px",

                borderRadius: "8px",

                cursor: "pointer",

              }}

            >

              Cancel

            </button>

          )}

        </div>



        <table

          style={{

            width: "100%",

            background: "#fff",

            borderCollapse: "collapse",

            boxShadow: "0 4px 12px rgba(0,0,0,.08)",

            borderRadius: "10px",

            overflow: "hidden",

          }}

        >

          <thead

            style={{

              background: "#2563eb",

              color: "#fff",

            }}

          >

            <tr>

              <th style={{ padding: "15px" }}>Customer</th>

              <th>Product</th>

              <th>Quantity</th>

              <th>Total Amount</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>



          <tbody>

            {challans.length === 0 ? (

              <tr>

                <td

                  colSpan={6}

                  style={{

                    textAlign: "center",

                    padding: "20px",

                  }}

                >

                  No Challans Found

                </td>

              </tr>

            ) : (

              challans.map((item: any) => (

                <tr key={item._id}>

                  <td style={{ padding: "15px" }}>

                    {item.customer?.name}

                  </td>



                  <td>{item.products?.[0]?.product?.name}</td>



                  <td>{item.products?.[0]?.quantity}</td>



                  <td>₹ {item.totalAmount}</td>



                  <td>{item.status}</td>



                  <td>

                    <button

                      onClick={() => handleEdit(item)}

                      style={{

                        background: "#f59e0b",

                        color: "#fff",

                        border: "none",

                        padding: "8px 15px",

                        borderRadius: "6px",

                        cursor: "pointer",

                        marginRight: "10px",

                      }}

                    >

                      Edit

                    </button>



                    <button

                      onClick={() => handleDelete(item._id)}

                      style={{

                        background: "#ef4444",

                        color: "#fff",

                        border: "none",

                        padding: "8px 15px",

                        borderRadius: "6px",

                        cursor: "pointer",

                      }}

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </>

  );

}