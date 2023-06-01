import { Box, TextField } from "@mui/material";
import * as yup from "yup";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { getAllUsers, updateUser, uploadImage } from "../services/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { swictchReaload, handleUserAction } from "../redux/usersSlice";
import { upDateUser } from "../redux/authSlice";

const ModalEditUser = ({ item }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    const idLocalStorage = JSON.parse(localStorage.getItem("infoUser"))?.id;

    const onFinish = async (values) => {
        console.log(values);
        // // const newUserList = await getAllUsers();
        const ResImageUpload = await uploadImage({
            avatar: file,
            id: item.id,
        });
        if (ResImageUpload && ResImageUpload.errCode === 0) {
            const ResUser = await updateUser({
                id: item.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                address: values.address,
                avatar: ResImageUpload.file.filename,
            });

            if (ResUser.errCode == 0) {
                if (idLocalStorage === item.id) {
                    localStorage.clear();
                    localStorage.setItem(
                        "infoUser",
                        JSON.stringify(ResUser.data)
                    );
                    localStorage.setItem("role", ResUser.data.role);
                    dispatch(upDateUser(ResUser.data));
                }
                dispatch(
                    handleUserAction({ type: "updateUser", data: ResUser.data })
                );
            }
        }
        console.log(ResImageUpload);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Header title="EDIT USER" subtitle="UPDATE User Profile" />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    width: "100%",
                    maxWidth: 600,
                }}
                initialValues={{ ...item, id: item.id }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item label="id" name="id">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="FirstName" name="firstName">
                    <Input />
                </Form.Item>
                <Form.Item label="LastName" name="lastName">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Contact Number" name="phoneNumber">
                    <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input />
                </Form.Item>
                <div className="my-3">
                    {
                        <img
                            src={`${
                                (item.avatar &&
                                    `http://localhost:8080/image/${item.avatar}`) ||
                                (file && `${URL.createObjectURL(file)}`)
                            }`}
                            alt=""
                        />
                    }
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* <Formik onSubmit={handleFormSubmit} validationSchema={checkoutSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.contactNumber}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                initialValues={item.attributes.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                UPDATE User
              </Button>
            </Box>
          </form>
        )}
      </Formik> */}
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});

export default ModalEditUser;
