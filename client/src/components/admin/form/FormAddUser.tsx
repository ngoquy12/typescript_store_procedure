import { CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../services/user.service";
import { AppDispatch } from "../../../redux/store";

interface TypeProps {
  handleCloseForm: () => void;
}

interface Gender {
  id: number;
  title: string;
}

const FormAddUser: React.FC<TypeProps> = ({ handleCloseForm }) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((error: any) => error.user.err);

  console.log("error", error);

  const inputRef: any = useRef(null);
  const [checked, setChecked] = useState(0);
  const [classId, setClassId] = useState("");

  const [user, setUser] = useState({
    UserName: "",
    DateOfBirth: "",
    Email: "",
    Passwords: "",
    CreatedBy: "",
    ModifiedBy: "",
  });

  // Mảng giới tính
  const genders: Gender[] = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const getClassId = (value: string) => {
    setClassId(value);
  };

  // submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      ...user,
      Gender: checked,
      ClassId: classId,
    };

    dispatch(createUser(newUser))
      .unwrap()
      .then((res) => {
        notification.success({
          message: "Thành công",
          description: "Thêm mới dữ liệu thành công",
        });
        return;
      })
      .catch((err) => {
        notification.error({
          message: "Cảnh báo",
          description: err.userMsg,
        });
        return;
      });
  };

  return (
    <>
      <div className="z-10 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-rgba0.5">
        <form
          className="bg-white w-1/4 px-4 py-4 rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between py-3">
            <h1 className="font-semibold text-xl">Thêm mới tài khoản</h1>
            <CloseOutlined
              className="cursor-pointer"
              onClick={handleCloseForm}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-start">
              <label htmlFor="" className="font-semibold mb-1">
                Tên
              </label>
              <Input
                onChange={handleChange}
                name="UserName"
                ref={inputRef}
                tabIndex={1}
              />
            </div>
            <div className="text-start flex flex-col">
              <label htmlFor="" className="font-semibold mb-1">
                Ngày sinh
              </label>
              <input
                className="border px-2 h-9 rounded outline-none"
                type="date"
                name="DateOfBirth"
                onChange={handleChange}
              />
            </div>
            <div className="text-start flex flex-col">
              <label htmlFor="" className="font-semibold mb-1">
                Giới tính
              </label>
              <div className="flex gap-3">
                {genders.map((gender: Gender) => (
                  <div key={gender.id}>
                    <>
                      {gender.title}
                      <input
                        checked={checked === gender.id}
                        onChange={() => setChecked(gender.id)}
                        type="radio"
                        tabIndex={3}
                      />
                    </>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-start">
              <label htmlFor="" className="font-semibold mb-1">
                Email
              </label>
              <Input onChange={handleChange} name="Email" tabIndex={6} />
            </div>
            <div className="text-start">
              <label htmlFor="" className="font-semibold mb-1">
                Mật khẩu
              </label>
              <Input onChange={handleChange} name="Passwords" tabIndex={7} />
            </div>
            <div className="text-start flex flex-col">
              <label htmlFor="" className="font-semibold mb-1">
                Lớp
              </label>
              <Select
                onChange={getClassId}
                tabIndex={8}
                options={[
                  {
                    value: "11452b0c-768e-5ff7-0d63-eeb1d8ed8cef",
                    label: "JS-OFF230213",
                  },
                  {
                    value: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                    label: "JV-230312",
                  },
                  {
                    value: "17120d02-6ab5-3e43-18cb-66948daf6128",
                    label: "JV-230630",
                  },
                  {
                    value: "469b3ece-744a-45d5-957d-e8c757976496",
                    label: "JS-230213",
                  },
                  {
                    value: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
                    label: "JS-230413",
                  },
                ]}
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-end gap-2">
            <Button tabIndex={10}>Hủy</Button>
            <Button
              htmlType="submit"
              tabIndex={9}
              className="bg-blue-600"
              type="primary"
            >
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormAddUser;
