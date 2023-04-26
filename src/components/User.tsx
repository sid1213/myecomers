import { Button, Tag } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { setLogStatus } from "../store/loginDetails";
interface prop {
  name: string;
}
const User: React.FC<prop> = ({ name }) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    let logged = false;
    let userIndex = -1;
    dispatch(setLogStatus({ logged, userIndex }));
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className="container">
      <h1 className="mt-2">
        Welcome <Tag color="magenta"> {name}</Tag>
      </h1>
      <Button className="mt-2" type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default User;
