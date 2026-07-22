import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!name || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/customers", {
        name,
        phone,
        email,
      });

      setName("");
      setPhone("");
      setEmail("");
      setShowForm(false);

      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete Customer?")) return;

    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(err);
    }
  };
return (
<>
<Navbar />

<div
style={{
marginLeft:"260px",
padding:"30px",
background:"#f4f7fb",
minHeight:"100vh"
}}
>

<h1
style={{
marginBottom:"25px",
color:"#1e293b"
}}
>
Customers
</h1>

<button
onClick={() => setShowForm(true)}
style={{
background:"#2563eb",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"8px",
cursor:"pointer",
marginBottom:"20px"
}}
>
+ Add Customer
</button>

{showForm && (

<div
style={{
background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 4px 12px rgba(0,0,0,.08)",
width:"400px",
marginBottom:"30px"
}}
>

<input
type="text"
placeholder="Customer Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
/>

<input
type="text"
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
/>

<button
onClick={handleSave}
style={{
background:"#16a34a",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"8px"
}}
>
Save Customer
</button>

</div>

)}

<table
style={{
width:"100%",
background:"white",
borderCollapse:"collapse",
boxShadow:"0 4px 10px rgba(0,0,0,.08)"
}}
>

<thead
style={{
background:"#2563eb",
color:"white"
}}
>

<tr>
<th style={{padding:"15px"}}>Name</th>
<th>Phone</th>
<th>Email</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{customers.map((customer:any)=>(

<tr key={customer._id}>

<td style={{padding:"15px"}}>{customer.name}</td>

<td>{customer.phone}</td>

<td>{customer.email}</td>

<td>

<button
onClick={()=>handleDelete(customer._id)}
style={{
background:"#ef4444",
color:"white",
padding:"8px 18px",
border:"none",
borderRadius:"6px"
}}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</>
);
}