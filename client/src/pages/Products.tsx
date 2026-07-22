import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Products() {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/products", {
        name,
        price: Number(price),
        quantity: Number(quantity),
      });

      setName("");
      setPrice("");
      setQuantity("");
      setShowForm(false);

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
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
          Products
        </h1>

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          + Add Product
        </button>

        {showForm && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
              width: "420px",
              marginBottom: "30px",
            }}
          >
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

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
                background: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save Product
            </button>
          </div>
        )}

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
              <th style={{ padding: "15px" }}>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id}>
                  <td style={{ padding: "15px" }}>{product.name}</td>
                  <td>₹ {product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "8px 18px",
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