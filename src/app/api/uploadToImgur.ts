const uploadToImgur = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: "Client-ID IMGUR_CLIENT_ID",
    },
    body: formData,
  });

  const result = await response.json();
  return result.data.link; // URL of the uploaded image
};
