import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import {
  Card,
  Avatar,
  Col,
  Typography,
  Row,
  Button,
  Divider,
  message,
} from "antd";
import axios from "axios";

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
const { Meta } = Card;

function StudyGroupPage(props) {
  let navigate = useNavigate();
  const [StudyGroup, setStudyGroup] = useState([]);

  useEffect(() => {
    axios.get("/api/studygroups/getStudyGroups").then((response) => {
      if (response.data.success) {
        setStudyGroup(response.data.groups);
      } else {
        message.error(
          "StudyGroup Infomation Error! Please contact the site manager"
        );
        navigate("/");
      }
    });
    return () => {
      setStudyGroup([]);
    };
  }, []);

  return (
    <div
      className="app"
      style={{ display: "flex", width: "85%", margin: "auto" }}
    >
      <Title level={2} style={{ marginTop: "25px" }}>
        스터디 그룹
      </Title>
      <h4 style={{ color: "darkgrey" }}>
        같은 관심사를 가진 멤버들과 하나의 주제를 공부해볼 수 있는 스터디 그룹
        페이지입니다
      </h4>
      <Divider />
      <br />
      <Row gutter={[32, 16]}>
        {StudyGroup.map((groups, index) => {
          console.log(groups);
          return (
            <Col lg={6} md={8} xs={24} key={index}>
              <a href={`/studygroups/${groups._id}`}>
                <div>
                  <img
                    style={{ width: "100%" }}
                    src={groups.filePath}
                    alt="이미지"
                  />
                </div>
                <br />
                <span>
                  <h2>{groups.title}</h2>
                </span>
              </a>
              <br />
              <div
                style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr" }}
              >
                <Meta
                  avatar={<Avatar src={groups.manager.image} />}
                  title={groups.manager.name}
                  description=""
                />
                {groups.applicationPeriod ? (
                  <h3
                    className="applicationPeriodMarker"
                    style={{ backgroundColor: "green" }}
                  >
                    모집
                  </h3>
                ) : (
                  <h3
                    className="applicationPeriodMarker"
                    style={{ backgroundColor: "coral" }}
                  >
                    마감
                  </h3>
                )}
              </div>
              <br />
            </Col>
          );
        })}
      </Row>
      <br />
      <Divider />
      <br />
      <Divider />
      <a href="/studygroups/register">
        <Button type="default" style={{ minWidth: "100%" }}>
          스터디 그룹 등록하기
        </Button>
      </a>
      <Divider />
    </div>
  );
}

export default withRouter(StudyGroupPage);
