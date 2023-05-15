import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { GreenButton } from "../components/common/GreenButton";
import { postTradeProduct } from "../api/product";
import { TextInputField } from "../components/common/TextInputField";
import { useInput } from "../hooks/useInput";
import { useMutation, useQueryClient } from "react-query";
import { async } from "q";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const AddProduct = () => {
  const [image, setImage] = useState("");
  const [view, setView] = useState("");

  const [title, handleTitleChange] = useInput("");
  const [content, handleContentChange] = useInput("");
  const [price, handlePriceChange] = useInput("");
  const [category, handleCategoryChange] = useInput("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    // Check file type
    const fileType = file.type.split("/")[0];
    if (fileType !== "image") {
      alert("The selected file is not an image.");
      return;
    }

    // Check file size
    const maxSize = 3 * 1024 * 1024; // 3 MB
    if (file.size > maxSize) {
      alert("File size is too large. Please select a file under 3 MB.");
      return;
    }
    // console.log(file);

    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setView(reader.result);
    };
  };

  const addProductMutate = useMutation(postTradeProduct, {
    onSuccess: async () => {
      toast.success("작성 성공!");
      await queryClient.invalidateQueries("productList");
      navigate("/products");
    },
    onError: (error) => {
      toast.error(error.response.data.errorMessage);
    },
  });
  const handleSubmit = () => {
    addProductMutate.mutate({ title, content, price, category, photo: image });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-center items-center text-gray-600 min-w-[700px] "
    >
      <h2 className="px-56 text-xl my-3">상품등록</h2>
      <div className="px-4 py-24 mx-7 ">
        <div className="flex flex-col">
          {/* image part */}

          <div className="flex justify-center items-center rounded-lg w-[500px] h-[300px] mx-10">
            <label
              htmlFor="imageInput"
              className="flex justify-center items-center cursor-pointer w-full h-full rounded-lg mx-10 min-h-[300px] bg-[#f1ffe9] hover:bg-[#e5f2dd] transition-colors duration-200 ease"
              title="Upload Image"
            >
              {view ? "" : "이미지 업로드"}
              <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageChange} />
              {view ? (
                <img className="rounded-lg object-cover shadow-md w-full h-full mx-10" src={view} alt="" />
              ) : (
                <div className="flex justify-center items-center rounded-lg ml-3">
                  <BsCardImage />
                </div>
              )}
            </label>
          </div>

          {/* body part */}
          <div className="flex flex-col items-center justify-center">
            <TextInputField
              autofocus={true}
              inputLabel="Title"
              inputType="text"
              placeholderText="제목"
              value={title}
              handleInputChange={handleTitleChange}
            />
            <TextInputField inputLabel="Content" inputType="text" placeholderText="내용" value={content} handleInputChange={handleContentChange} />
            <TextInputField inputLabel="Price" inputType="text" placeholderText="가격" value={price} handleInputChange={handlePriceChange} />
            <TextInputField
              inputLabel="Category"
              inputType="text"
              placeholderText="카테고리"
              value={category}
              handleInputChange={handleCategoryChange}
            />
            <div className="w-2/3 px-4 mt-5">
              <GreenButton buttonText="추가" clickHandler={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
