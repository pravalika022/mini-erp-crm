import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Inventory", path: "/inventory" },
    { name: "Challans", path: "/challans" },
  ];

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1e293b",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "30px 20px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#38bdf8",
        }}
      >
        Mini ERP CRM
      </h2>

      {links.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "block",
            padding: "14px 18px",
            marginBottom: "12px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "white",
            background:
              location.pathname === item.path ? "#2563eb" : "transparent",
            transition: "0.3s",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}