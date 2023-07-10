import React from "react";
import Button from "./Button";
import { User } from "../App";

interface TableProps {
	data: User[];
	headers: string[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	handleEditUser: (user: User) => void;
}

const Table: React.FC<TableProps> = ({
	data,
	headers,
	setUsers,
	handleEditUser,
}) => {
	const handleDelete = (id: string) => {
		const newData = data.filter((item) => item.id !== id);
		setUsers(newData);
	};

	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto">
				<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								{headers.map((header, index) => (
									<th
										key={index}
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((row, index) => (
								<tr key={index}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{index + 1}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{row.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{row.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{row.age}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex  gap-3">
										<Button
											onClick={() => handleEditUser(row)}
											type="button"
											buttonType="edit"
											label="Edit"
										/>
										<Button
											type="button"
											label="Delete"
											buttonType="delete"
											onClick={() => handleDelete(row.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Table;