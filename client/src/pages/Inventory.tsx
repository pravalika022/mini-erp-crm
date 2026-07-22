import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("IN");
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchInventory();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await API.get("/inventory");
      setInventory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!product || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/inventory", {
        product,
        quantity: Number(quantity),
        type,
        note,
      });

      setProduct("");
      setQuantity("");
      setType("IN");
      setNote("");

      fetchProducts();
      fetchInventory();

      alert("Inventory Updated Successfully");
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
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
          Inventory Management
        </h1>

        <div
          style={{
            background: "#fff",
            width: "430px",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
            marginBottom: "30px",
          }}
        >
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

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="IN">Stock IN</option>
            <option value="OUT">Stock OUT</option>
          </select>

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
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
            Save Inventory
          </button>
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
              <th style={{ padding: "15px" }}>Product</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Inventory Records
                </td>
              </tr>
            ) : (
              inventory.map((item: any) => (
                <tr key={item._id}>
                  <td style={{ padding: "15px" }}>
                    {item.product?.name}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <span
                      style={{
                        color:
                          item.type === "IN"
                            ? "#16a34a"
                            : "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td>{item.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}