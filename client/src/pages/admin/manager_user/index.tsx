import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAndPaging } from "../../../services/user.service";
import { AppDispatch } from "../../../redux/store";

const Manager_User: React.FC<{}> = () => {
  const dispatch: AppDispatch = useDispatch();

  const listUser = useSelector((state: any) => state.user.data.listUser);
  const totalCount = useSelector((state: any) => state.user.data.totalCount);

  useEffect(() => {
    dispatch(searchAndPaging());
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Quản lý tài khoản</h3>
          <Button type="primary" className="bg-blue-600">
            Thêm mới tài khoản
          </Button>
        </div>
        <div className="flex justify-between">
          <Button>Thực hiện hàng loạt</Button>
          <Input className="w-80" placeholder="Tìm kiếm theo tên hoặc email" />
        </div>
        <div>
          <table className="w-full border">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Lớp</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((user: any) => (
                <tr key={user.UserId}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.UserName}</td>
                  <td>
                    {user.Gender === 0
                      ? "Nam"
                      : user.Gender === 1
                      ? "Nữ"
                      : "Khác"}
                  </td>
                  <td>{user.DateOfBirth}</td>
                  <td>{user.Email}</td>
                  <td>{user.ClassName}</td>
                  <td>
                    <Button>Sửa</Button>
                    <Button>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <div>
            Hiển thị <span className="font-semibold">{totalCount}</span> bản ghi
          </div>
          <div className="flex justify-between items-center gap-3">
            <select className="h-9 border outline-none px-4">
              <option value={10}>Hiển thị 10 bản ghi trên trang</option>
              <option value={20}>Hiển thị 20 bản ghi trên trang</option>
              <option value={30}>Hiển thị 30 bản ghi trên trang</option>
              <option value={50}>Hiển thị 50 bản ghi trên trang</option>
              <option value={100}>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <div className="flex gap-3">
              <p>Trước</p>
              <p>Tiếp</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_User;
