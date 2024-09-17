async function UploadCksAPI(dataUpload) {
  const url = `${process.env.REACT_APP_API_URL}/upload-digital-signature`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("🚀 ~ UploadCksAPI ~ data:", data);
    return data; // Trả về dữ liệu để xử lý lỗi
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}
export default UploadCksAPI;
