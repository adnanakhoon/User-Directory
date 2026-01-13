import { User } from "../types";
type Props = {
users: User[];
};
export default function UserList({ users }: Props) {
return (
<table>
<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Company</th>
</tr>
</thead>
<tbody>
{users.map((user) => (
<tr key={user.id}>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.phone}</td>
<td>{user.company?.name || "-"}</td>
</tr>
))}
</tbody>
</table>
);
}