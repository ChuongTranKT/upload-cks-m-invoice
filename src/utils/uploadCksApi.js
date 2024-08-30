async function UploadCksAPI(dataCks, cookie) {
  const url = "https://hddt.minvoice.com.vn/api/api/app/token";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(dataCks),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Trả về dữ liệu để xử lý lỗi
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}
export default UploadCksAPI;
