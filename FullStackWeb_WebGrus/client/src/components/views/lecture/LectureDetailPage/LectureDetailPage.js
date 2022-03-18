import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  List,
  Avatar,
  Typography,
  Divider,
  Button,
  Skeleton,
  Popconfirm,
  message,
  Icon,
} from "antd";
import axios from "axios";
import LectureApplicationTab from "./Sections/LectureApplicationTab.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const { Title } = Typography;

function LectureDetailPage(props) {
  let navigate = useNavigate();

  const [LectureDetail, setLectureDetail] = useState([]);

  const user = useSelector((state) => state.user);
  const { lectureId } = useParams();
  const variable = {
    lectureId: lectureId,
  };

  useEffect(() => {
    axios.post("/api/lectures/getLectureDetail", variable).then((response) => {
      if (response.data.success) {
        setLectureDetail(response.data.lectureDetail);
        console.log(response.data.lectureDetail.filePath);
      } else {
        message.error(
          "강의 정보를 불러오지 못 했습니다! 관리자에게 문의하세요"
        );
        navigate("/lectures");
      }
    });
  }, []);

  const onDelete = () => {
    axios.post("/api/lectures/deleteLecture", variable).then((response) => {
      if (response.data.success) {
        message.warning("Lecture deleted");
        navigate("/lectures");
      } else {
        message.error("강의 삭제에 실패했습니다! 관리자에게 문의하세요");
        navigate("/lectures");
      }
    });
  };

  if (LectureDetail.teacher && user.userData) {
    var buttons = <></>;
    if (LectureDetail.teacher._id === user.userData._id) {
      buttons = (
        <div tyle={{ width: "90%", display: "flex", flexDirection: "column" }}>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
            <div>
              <a href={`/lectures/${lectureId}/edit`}>
                <Button
                  type="default"
                  style={{ minWidth: "100%", marginRight: "20px" }}
                >
                  강의 수정하기
                </Button>
              </a>
            </div>
            <div>
              <Popconfirm
                title="확실합니까? 삭제한 뒤에는 복구할 수 없습니다"
                onConfirm={onDelete}
                icon={<Icon type="question" style={{ color: "red" }} />}
              >
                <Button
                  style={{
                    minWidth: "100%",
                    color: "red",
                    borderColor: "coral",
                  }}
                >
                  강의 삭제하기
                </Button>
              </Popconfirm>
            </div>
          </div>
          <Divider />
        </div>
      );
    } else if (user.userData.isAdmin == true) {
      buttons = (
        <div style={{ width: "90%", display: "flex", flexDirection: "column" }}>
          <Divider />
          <div>
            <Popconfirm
              title="확실합니까? 삭제한 뒤에는 복구할 수 없습니다"
              onConfirm={onDelete}
              icon={<Icon type="question" style={{ color: "red" }} />}
            >
              <Button
                style={{ minWidth: "100%", color: "red", borderColor: "coral" }}
              >
                강의 삭제하기
              </Button>
            </Popconfirm>
          </div>
          <Divider />
        </div>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        <Col lg={24} xs={24}>
          <div className="app" style={{ width: "85%", margin: "auto" }}>
            <Title level={2} style={{ marginTop: "25px" }}>
              {" "}
              {LectureDetail.title}{" "}
            </Title>
            <Divider />
            <br />
            <img
              style={{ width: "50%" }}
              src={`http://27.96.131.34:3000/${LectureDetail.filePath}`} // 리눅스 서버에서는 서버:포트/${경로} 로 적어야함!
              alt="이미지"
              controls
            />
            <br />
            <Divider>
              <h2>강의자</h2>
            </Divider>
            <List.Item actions>
              <List.Item.Meta
                avatar={<Avatar src={LectureDetail.teacher.image} />}
                title={LectureDetail.teacher.name}
                description=""
              />
            </List.Item>
            <Divider />
            <Divider>
              <h2>설명</h2>
            </Divider>
            <br />
            <h3>{LectureDetail.description}</h3>
            <br />
            <Divider />
            <Divider>
              <h2>강의자 연락처</h2>
            </Divider>
            <br />
            <h3>{LectureDetail.contactInfo}</h3>
            <br />
            <Divider />
            <LectureApplicationTab ThisLecture={LectureDetail} />
            {buttons}
          </div>
        </Col>
      </Row>
    );
  } else {
    return (
      <div className="app" style={{ width: "50%", margin: "auto" }}>
        <Skeleton active />
      </div>
    );
  }
}

export default withRouter(LectureDetailPage);
