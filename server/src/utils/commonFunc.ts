/**
 * Định dạng chuỗi thời gian
 * @param date : Chuỗi cần định dạng
 * @returns: Trả về chuỗi thời gian đã định dạng
 * Author: NVQUY(09/10/2023)
 * ModifiedBy:....
 */
export const formatYMD = (date: any) => {
  // Lấy ra định dạng thời gian dựa vào thời gian hiện tại
  const today = new Date(date);

  // Lấy ra ngày từ chuỗi
  let day = String(today.getDate());
  if (Number(day) > 0 && Number(day) < 10) {
    day = `0${day}`;
  }

  // Lấy ra tháng từ chuỗi
  let month = String(today.getMonth() + 1);
  if (Number(month) > 0 && Number(month) < 10) {
    month = `0${month}`;
  }

  // Lấy ra năm từ chuỗi
  let year = today.getFullYear();

  // Trả về chuỗi định dạng ngày-tháng-năm
  return `${year}-${month}-${day}`;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
