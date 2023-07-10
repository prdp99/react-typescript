import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Button from "./Button";
import { User } from "../App";

interface AddUserProps {
	setUsers: React.Dispatch<
		React.SetStateAction<
			User[]
		>
	>;
	setIsAddUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUser = ({ setUsers, setIsAddUser }: AddUserProps) => {
	const [user, setUser] = useState({
		id: uuidv4(),
		name: "",
		email: "",
		age: "",
	});

	const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => {
			return {
				...prev,
				[name]: value,
				id: uuidv4(),
			};
		});
	};
	const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setUsers((prev: any) => {
			return [...prev, user];
		});
		setIsAddUser(false);
	};

	return (
		<form
			onSubmit={handleAddUser}
			className="flex flex-col bg-gray-300 py-8 px-4 gap-4"
		>
			<Input
				type="text"
				label="Name"
				name="name"
				value={user.name}
				onChange={handleChangeUser}
				required
				minLength={2}
				maxLength={50}
			/>
			<Input
				type="email"
				label="Email"
				name="email"
				value={user.email}
				onChange={handleChangeUser}
				required
			/>
			<Input
				type="text"
				label="Age"
				name="age"
				value={user.age}
				onChange={handleChangeUser}
				required
				minLength={1}
				maxLength={3}
			/>
			<Button type="submit" buttonType="save" label="Save" />
		</form>
	);
};

export default AddUser;
