import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Form,
  Select,
  Typography,
  Cascader,
  Checkbox,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAccountSchema } from "../../utils/validation";
import { message } from "antd";
import "./formThree.css";

// constant
const FORM_DATA = "form-data";
const { Text, Title } = Typography;
const { Option } = Select;

const residences = [
  {
    value: "Palestine",
    label: "Palestine",
    children: [
      {
        value: "Gaza strip",
        label: "Gaza strip",
        children: [
          {
            value: "Rafah",
            label: "Rafah",
          },
          {
            value: "KhanYounis",
            label: "KhanYounis",
          },
        ],
      },
    ],
  },
  {
    value: "Jordan",
    label: "Jordan",
    children: [
      {
        value: "Amman",
        label: "Amman",
        children: [
          {
            value: "AlBalqa",
            label: "AlBalqa",
          },
        ],
      },
    ],
  },
];

const FormThree = () => {
  const [dataform, setDataform] = useState(true);
  const [defData, setDefData] = useState("");
  // hooks

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registerAccountSchema),
  });
  // functions
  const success = () => {
    message.success("This is a success message");
  };

  const submit = (data) => {
    const stringData = JSON.stringify(data);
    localStorage.setItem(FORM_DATA, stringData);
    setDataform(false);
    const newLocal = FormData.nickName;
    message.success("This is a success message");
    message.success("Welcome " + data.nickName);
  };

  const { agreement } = watch();

  const prefixSelector = (
    <Controller
      name="countryKey"
      control={control}
      render={({ field }) => (
        <Select {...field}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
          <Option value="86">+972</Option>
        </Select>
      )}
    />
  );
  useEffect(() => {
    if (localStorage.getItem(FORM_DATA)) {
      const data = JSON.parse(localStorage.getItem(FORM_DATA));

      for (const property in data) {
        setValue(property, data[property]);
      }
    }
  }, []);
  return (
    <div className="container">
      <Title>Register you account </Title>
      {dataform ? (
        <Form className="form" onSubmitCapture={handleSubmit(submit)}>
          <div className="input-cell">
            <Text className="label">Email :</Text>
            <div className="input-content">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="eg: example@gmail.com"
                    type="email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <Text className="error">{errors.email.message}</Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <Text className="label">Password :</Text>
            <div className="input-content">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    placeholder="password"
                    type={"password"}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <Text className="error">{errors.password.message}</Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <Text className="label">Confirm Password :</Text>
            <div className="input-content">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    placeholder="confirm password"
                    type={"password"}
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="error">{errors.confirmPassword.message}</Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <Text className="label">Nick name :</Text>
            <div className="input-content">
              <Controller
                name="nickName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="eg: linda" {...field} />
                )}
              />
              {errors.nickName && (
                <Text className="error">{errors.nickName.message}</Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <Text className="label">Habitual Residence" :</Text>
            <div className="input-content-r">
              <Controller
                name="habitualResidence"
                control={control}
                render={({ field }) => (
                  <Cascader options={residences} {...field} />
                )}
              />
              {errors.habitualResidence && (
                <Text className="error">
                  {errors.habitualResidence.message}
                </Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <Text className="label">Phone Number :</Text>
            <div className="input-content">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="59000000"
                    addonBefore={prefixSelector}
                    {...field}
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text className="error">{errors.phoneNumber.message}</Text>
              )}
            </div>
          </div>
          <div className="input-cell">
            <div className="input-content">
              <Controller
                name="agreement"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field}>
                    I have read the <a href="">agreement</a>
                  </Checkbox>
                )}
              />
              {errors.agreement && (
                <Text className="error">{errors.agreement.message}</Text>
              )}
            </div>
          </div>
          <Button
            disabled={!agreement || Object.keys(errors).length > 0}
            className="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FormThree;
