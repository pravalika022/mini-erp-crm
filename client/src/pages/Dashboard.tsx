import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [challans, setChallans] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const customerRes = await API.get("/customers");
      const productRes = await API.get("/products");
      const challanRes = await API.get("/challans");

      setCustomers(customerRes.data.length);
      setProducts(productRes.data.length);
      setChallans(challanRes.data.length);

      let total = 0;

      challanRes.data.forEach((item: any) => {
        total += item.totalAmount;
      });

      setRevenue(total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          marginLeft: "270px",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#1e293b",
          }}
        >
          Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#64748b" }}>Total Customers</h2>
            <h1 style={{ color: "#2563eb", marginTop: "10px" }}>
              {customers}
            </h1>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#64748b" }}>Total Products</h2>
            <h1 style={{ color: "#10b981", marginTop: "10px" }}>
              {products}
            </h1>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#64748b" }}>Total Challans</h2>
            <h1 style={{ color: "#f59e0b", marginTop: "10px" }}>
              {challans}
            </h1>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#64748b" }}>Total Revenue</h2>
            <h1 style={{ color: "#ef4444", marginTop: "10px" }}>
              ₹ {revenue}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}