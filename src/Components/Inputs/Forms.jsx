import { AutoComplete, Button, Form, Input, Select, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addData,
  addTemplate,
  draftFalse,
  editData,
  removeUserId
} from "../../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import Template3 from "../Templates/Template3";
import { useSelector } from "react-redux";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const Forms = () => {
  const createrid=useSelector((state)=>state.authentication.number)
  const template = useSelector((state) => state.user.TemplateNo);
  const isDataDraft = useSelector((state) => state.user.DraftData);
  const UserData = useSelector((state) => state.user.LoggedinUserData);
  const { Option } = Select;
  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="90">+90</Option>
        <Option value="87">+89</Option>
      </Select>
    </Form.Item>
  );
  const initialValues = {
    id: Date.now(),
    name1: "",
    school1: "",
    schoolMarks1: "",
    university1: "",
    graduatingYear1: "",
    cgpa1: "",
    intro1: "",
    email1: "",
    phone1: "",
    website1: "",
    project11: "",
    project21: "",
    gender: "",
    TemplateNumber: template,
    status: "publish",
  };
  const [data, setData] = useState(initialValues);
  if (isDataDraft === true) {
    data.name1 = UserData.name1;
    data.school1 = UserData.school1;
    data.cgpa1 = UserData.cgpa1;
    data.email1 = UserData.email1;
    data.graduatingYear1 = UserData.graduatingYear1;
    data.intro1 = UserData.intro1;
    data.phone1 = UserData.phone1;
    data.project11 = UserData.project11;
    data.project21 = UserData.project21;
    data.schoolMarks1 = UserData.schoolMarks1;
    data.university1 = UserData.university1;
    data.website1 = UserData.website1;
  }
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Data Missing",
      description:
        "Please fill all the details.As it will be mandatory to upgrade your resume.Thankyou",
      duration: 20,
    });
  };
  const [Draftapi, DraftcontextHolder] = notification.useNotification();
  const draftNotification = () => {
    Draftapi.open({
      message: "Data Missing",
      description:
        "You have to fill phone number and name to save it to draft. So that you can edit in future",
      duration: 10,
    });
  };
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  const [val, setVal] = useState(false);
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(draftFalse());
  const onFinish = (values) => {
    if (
      data.name1 === "" ||
      data.school1 === "" ||
      data.cgpa1 === "" ||
      data.email1 === "" ||
      data.graduatingYear1 === "" ||
      data.intro1 === "" ||
      data.phone1 === "" ||
      data.project11 === "" ||
      data.project21 === "" ||
      data.schoolMarks1 === "" ||
      data.university1 === "" ||
      data.website1 === "" ||
      data.gender===""
    ) {
      openNotification();
    } else {
      dispatch(addTemplate(template));
      dispatch(addData({ templateNo: template, cvData: data,createrid: createrid}));
      dispatch(removeUserId());
      navigate("/profile");
    }
  };
  const cancelBtn = () => {
    draftFalse();
    navigate("/profile");
  };
  const draftBtn = () => {
    if (data.name1 === "" || data.phone1 === "") {
      // setDraft(true);
      draftNotification();
    } else {
      data.status = "Draft";
      dispatch(draftFalse());
      dispatch(addTemplate(template));
      dispatch(editData({ templateNo: template, cvData: data,createrid: createrid}));
      navigate("/profile");
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const previewBtn = () => {
    dispatch(draftFalse());
    setVal(true);
  };
  return (
    <>
      <div className="form" style={{ width: "1000px", marginTop: "20px" }}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "91",
          }}
          style={{
            width: "800px",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: false,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="name1"
              defaultValue={data.name1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="school"
            label="Enter School Name"
            rules={[
              {
                required: false,
                message: "Please input your School",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="school1"
              defaultValue={data.school1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="schoolMarks"
            label="Enter School Marks"
            rules={[
              {
                required: false,
                message: "Please input your Marks!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="schoolMarks1"
              defaultValue={data.schoolMarks1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="university"
            label="Enter University"
            rules={[
              {
                required: false,
                message: "Please input your University",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="university1"
              defaultValue={data.university1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="graduatingYear"
            label="Enter Graduating Year"
            rules={[
              {
                required: false,
                message: "Please input your year!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="graduatingYear1"
              defaultValue={data.graduatingYear1}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="cgpa"
            label="Enter Your CGPA "
            rules={[
              {
                required: false,
                message: "Please input your CGPA !",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="cgpa1"
              defaultValue={data.cgpa1}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="intro"
            label="Intro"
            rules={[
              {
                required: false,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea
              name="intro1"
              defaultValue={data.intro1}
              onChange={handleChange}
              showCount
              maxLength={200}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: false,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              name="email1"
              defaultValue={data.email1}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: false,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              name="phone1"
              defaultValue={data.phone1}
              onChange={handleChange}
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: false,
                message: "Please input website!",
              },
            ]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder="website"
            >
              <Input
                name="website1"
                defaultValue={data.website1}
                onChange={handleChange}
              />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="project1"
            label="Enter About Project 1"
            rules={[
              {
                required: false,
                message: "Please input Project",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={200}
              name="project11"
              defaultValue={data.project11}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="project2"
            label="Enter About Project 2"
            rules={[
              {
                required: false,
                message: "Please input Project ",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={200}
              name="project21"
              defaultValue={data.project21}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: false,
                message: "Please select gender!",
              },
            ]}
          >
            <Input
              name="gender"
              defaultValue={data.gender}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item className="form_buttons">
            <Button
              type="primary"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              htmlType="submit"
            >
              Save
            </Button>
            <Button
              type="primary"
              htmlType="reset"
              style={{ backgroundColor: "red", marginRight: "10px" }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              onClick={() => previewBtn()}
            >
              Preview
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              onClick={() => cancelBtn()}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              onClick={() => draftBtn()}
            >
              Draft
            </Button>
          </Form.Item>
        </Form>
        {contextHolder}
        {DraftcontextHolder}
      </div>
      {(() => {
        if (val === true) {
          if (template === 1) {
            return <Template1 data={data} setVal={setVal} view={view} />;
          } else if (template === 2) {
            return <Template2 data={data} setVal={setVal} view={view} />;
          } else {
            return <Template3 data={data} setVal={setVal} view={view} />;
          }
        }
      })()}
    </>
  );
};
export default Forms;
