import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAndPaging } from "../../../services/user.service";
import { AppDispatch } from "../../../redux/store";
import { formatDMY } from "../../../utils/commonFunc";
import debounce from "lodash.debounce";
import FormAddUser from "../../../components/admin/form/FormAddUser";

const Manager_User: React.FC<{}> = () => {
  //#region Các state của component
  const [keySearch, setKeySearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFormAdd, setShowFormAdd] = useState(false);
  //#endregion

  //#region Nhận dữ liệu từ store
  const dispatch: AppDispatch = useDispatch();
  const listUser = useSelector((state: any) => state.user.data.listUser);
  const totalCount = useSelector((state: any) => state.user.data.totalCount);
  //#endregion

  useEffect(() => {
    dispatch(searchAndPaging({ keySearch, pageSize, currentPage }));
  }, []);

  useEffect(() => {
    const searchDelay = debounce(() => {
      dispatch(searchAndPaging({ keySearch, pageSize, currentPage }));
    }, 500);

    searchDelay();

    return searchDelay.cancel;
  }, [keySearch, pageSize, currentPage]);

  // Lấy ra tổng số trang
  const totalPage = Math.ceil(totalCount / pageSize);

  // Chuyển sang trang tiếp theo
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Quay lại trang trước
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render số trang
  const renderPageNumber = (): any => {
    const pageNumbers: any = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <>
          <div className="flex gap-2">
            <span
              onClick={() => setCurrentPage(i)} // Thay đổi trang hiện tại
              className={`${
                currentPage === i ? "border font-bold" : ""
              }cursor-pointer px-2 `}
            >
              {i}
            </span>
          </div>
        </>
      );
    }
    return pageNumbers;
  };

  // Hiển thị form thêm mới
  const handleShowForm = () => {
    setShowFormAdd(true);
  };

  // Đóng form thêm mới
  const handleCloseForm = () => {
    setShowFormAdd(false);
  };

  return (
    <>
      {/* Form add user */}
      {showFormAdd && <FormAddUser handleCloseForm={handleCloseForm} />}

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Quản lý tài khoản</h3>
          <Button
            onClick={handleShowForm}
            type="primary"
            className="bg-blue-600"
          >
            Thêm mới tài khoản
          </Button>
        </div>
        <div className="flex justify-between">
          <Button>Thực hiện hàng loạt</Button>
          <Input
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
            className="w-80"
            placeholder="Tìm kiếm theo tên hoặc email"
          />
        </div>
        <div>
          <table className="w-full border overflow-y-auto">
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
            <tbody className="max-h-[400px] overflow-y-auto">
              {listUser?.map((user: any) => (
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
                  <td>{formatDMY(user.DateOfBirth)}</td>
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
            <select
              className="h-9 border outline-none px-4"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>Hiển thị 10 bản ghi trên trang</option>
              <option value={20}>Hiển thị 20 bản ghi trên trang</option>
              <option value={30}>Hiển thị 30 bản ghi trên trang</option>
              <option value={50}>Hiển thị 50 bản ghi trên trang</option>
              <option value={100}>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <div className="flex gap-3">
              <p
                onClick={handlePrev}
                className={`${
                  currentPage > 1 ? "font-semibold" : "font-thin cursor-default"
                } cursor-pointer`}
              >
                Trước
              </p>
              {renderPageNumber()}
              <p
                onClick={handleNext}
                className={`${
                  currentPage < totalPage
                    ? "font-semibold"
                    : "font-thin cursor-not-allowed"
                } cursor-pointer`}
              >
                Tiếp
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager_User;
