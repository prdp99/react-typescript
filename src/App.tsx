import React, { useState } from "react";
import Table from "./components/Table";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Button from "./components/Button";

export interface User {
	id: string;
	name: string;
	email: string;
	age: number;
}

const App: React.FC = () => {
	const headers: string[] = ["#", "Name", "Email", "Age", "Actions"];
	const [users, setUsers] = useState<User[]>([
		{ id: '1', name: "Mark", email: "mark@mail.com", age: 34 },
		{ id: '2', name: "Jacob", email: "jacob@gmail.com", age: 23 },
		{ id: '3', name: "Larry", email: "larry@gmail.com", age: 43 },
	]);

	const [isAddUser, setIsAddUser] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<User | null>(null);

	const handleEditUser = (user: User) => {
		setUserInfo(user);
		setIsEdit(true);
	};

	const handleExport = () => {
		const dataStr =
			"data:text/json;charset=utf-8," +
			encodeURIComponent(JSON.stringify(users));
		const downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "users.json");
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.readAsText(file, "utf-8");
		reader.onload = () => {
			try {
				const importedData = JSON.parse(reader.result as string);
				setUsers(importedData);
			} catch (error: any) {
				console.error(error.message);
			}
		};
	};

	return (
		<div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
			<div className="w-full md:w-5/6 lg:w-3/4 xl:w-1/2 bg-white rounded-md shadow-md p-6">
				<h2 className="text-3xl font-semibold text-center mb-4">
					<span className="text-blue-500">JSON</span> Format
				</h2>
				<div className="flex gap-3 justify-center items-center mb-2">
					<Button
						type="button"
						label="Add New"
						onClick={() => setIsAddUser(true)}
						buttonType="add"
					/>
					<Button
						type="button"
						label="Export"
						onClick={handleExport}
						buttonType="export"
					/>
					<label htmlFor="import-file">

						<input
							type="file"
							id="import-file"
							accept=".json"
							onChange={handleImport}
						/>
					</label>
					<input
						type="file"
						id="import-file"
						accept=".json"
						style={{ display: "none" }}
						onChange={handleImport}
					/>
				</div>
				<Table
					setIsEdit={setIsEdit}
					setUsers={setUsers}
					headers={headers}
					data={users}
					handleEditUser={handleEditUser}
				/>
			</div>
			{isAddUser && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
					<div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-60"></div>
					<div className="relative p-6 bg-white rounded-md shadow-md">
						<AddUser setUsers={setUsers} setIsAddUser={setIsAddUser} />
					</div>
				</div>
			)}
			{isEdit && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
					<div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-60"></div>
					<div className="relative p-6 bg-white rounded-md shadow-md">
						<EditUser
							userInfo={userInfo!}
							setUsers={setUsers}
							setIsEdit={setIsEdit}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;