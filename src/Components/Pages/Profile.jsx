import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { removeAuth } from "../../Features/AuthSlice";
import { useDispatch } from "react-redux";
import { addTemplate,draftData,removeUserId,setDataId } from "../../Features/UserSlice";
import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import Template3 from "../Templates/Template3";
const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [templateNO, setTemplateNo] = useState(null);
  const [details, setDetails] = useState(false);
  const [view, setView] = useState(true);
  const dispatch = useDispatch();
  const logoutBtn = () => {
    dispatch(addTemplate(1));
    dispatch(removeAuth());
    dispatch(removeUserId());
  };
  const getToForm = () => {
    navigate("/options");
  };
  const viewBtn = (data) => {
    console.log(data);
    setData(data?.CV);
    setTemplateNo(data?.Template);
    setDetails(true);
  };
  const draftBtn = (data) => {
   dispatch(setDataId(data.CV.id))
   dispatch(draftData(data));
   navigate("/form");
  };
  const cvData1 = useSelector((state) => state.user.Resumes);
  const number = useSelector((state) => state.authentication.number);
  console.log(cvData1,number)
  return (
    <>
      <div className="profileContainer">
        <div className="proContainer">
          {cvData1?.map((item) => {
            if (item.CreaterId === number) {
              return (
                <>
                  <div className="displaying">
                    <div className="profileImg">
                      <img
                        src="https://d1bvpoagx8hqbg.cloudfront.net/originals/how-to-take-a-good-photo-for-your-cv-our-top-tips-3d51fa22c6f19bb8fdb13a3834bba98c.jpg"
                        alt="can't"
                      />
                      {console.log(item.CV.status)}
                      {item.CV.status === "publish" ? (
                        <button
                          className="viewBtn"
                          onClick={(e) => viewBtn(item)}
                        >
                          View
                        </button>
                      ) : (
                        <button
                          className="draftBtn"
                          onClick={(e) => draftBtn(item)}
                        >
                          Draft
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div className="icon">
          <AddCircleIcon
            style={{ fontSize: "4rem" }}
            onClick={() => getToForm()}
          />
        </div>
        <div className="logOutBtn">
          <Button
            style={{ backgroundColor: "red", borderRadius: "25px" }}
            onClick={() => logoutBtn()}
          >
            Logout
          </Button>
        </div>
        {(() => {
          if (details === true) {
            if (templateNO === 1) {
              return <Template1 data={data} setVal={setDetails} view={view} />;
            } else if (templateNO === 2) {
              return <Template2 data={data} setVal={setDetails} view={view} />;
            } else {
              return <Template3 data={data} setVal={setDetails} view={view} />;
            }
          }
        })()}
      </div>
    </>
  );
};

export default Profile;
