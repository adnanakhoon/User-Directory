"use client";

import { useEffect, useState } from "react";
import { User } from "./types";
import UserList from "./components/userlist";
import SearchBox from "./components/searchbox";


export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Users Directory</h1>

      {loading && <p>Loading...</p>}

      {error && (
        <>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </>
      )}

      {!loading && !error && (
        <>
          <SearchBox value={search} onChange={setSearch} />
          <UserList users={filteredUsers} />
        </>
      )}
    </div>
  );
}
