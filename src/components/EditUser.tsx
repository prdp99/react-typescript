import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { User } from "../App";

interface EditUserProps {
	userInfo: {
		id: string | number;
		name: string;
		email: string;
		age: string | number;
	};
	setUsers: React.Dispatch<
		React.SetStateAction<
			User[]
		>>;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditUser = ({ setUsers, setIsEdit, userInfo }: EditUserProps) => {
	const [user, setUser] = useState(userInfo);

	useEffect(() => {
		setUser(userInfo);
	}, [userInfo]);

	const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setUsers((prev: any) => {
			const index = prev.findIndex((u: User) => u.id === userInfo.id);
			prev[index] = user;
			return prev;
		});
		setIsEdit(false);
	};

	return (
		<form
			onSubmit={handleUpdateUser}
			className="flex flex-col bg-gray-300 py-8 px-8 gap-4"
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

export default EditUser;
