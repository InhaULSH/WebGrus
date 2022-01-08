import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Row, Col, List, Avatar, Icon, Typography, Divider, Button } from 'antd';
import axios from 'axios';

const { Title } = Typography;

function LectureDetailPage(props) {
    const [LectureDetail, setLectureDetail] = useState([])

    const user = useSelector(state => state.user)
    const lectureId = props.match.params.lectureId
    const variable = {
      lectureId: lectureId
    }

    useEffect(() => {
      axios.post('/api/lectures/getLectureDetail', variable).then(response => {
        if (response.data.success) {
          setLectureDetail(response.data.lectureDetail)
        } else {
          alert('Lecture Infomation Error! Please contact the site manager')
          setTimeout(() => {
            props.history.push('/lecutures')
          }, 3000)
        }
      })
    }, [])

    if(LectureDetail.teacher && user.userData) {
      var buttons = (<></>)
      if (LectureDetail.teacher._id === user.userData._id) {
        buttons = (
          <div>
            <a href={`/lectures/${lectureId}/LectureEditPage`}>
              <Button type="default" style={{ minWidth: '100%' }} style={{ marginRight: '20px' }}>
                Edit this lecture
              </Button>
            </a>
          </div>
        )
      } else {
        buttons = (
          <div>
            <Button type="primary" style={{ minWidth: '100%' }}>
              Apply to this lecture
            </Button>
          </div>
        )
      }

      return (
        <Row gutter={[16,16]}>
          <Col lg={24} xs={24}>
            <div className="app" style={{ width: '85%', margin: 'auto' }}>
              <Title level={2} style={{ marginTop: '25px' }}> {LectureDetail.title} </Title>
              <Divider />
              <br />
              <img style={{ width: '50%'}} src={`http://localhost:5000/${LectureDetail.filePath}`} controls />
              <br />
              <Divider><h2>Lecturer</h2></Divider>
              <List.Item actions>
                <List.Item.Meta avatar={<Avatar src={LectureDetail.teacher.image} />}
                title={LectureDetail.teacher.name} description="" />
              </List.Item>
              <Divider />
              <br />
              <Divider><h2>Description</h2></Divider>
              <br />
              <h3>{LectureDetail.description}</h3>
              <br />
              <Divider />
              <br />
              <Divider><h2>Lecturer Conatact Infomation</h2></Divider>
              <br />
              <h3>{LectureDetail.contactInfo}</h3>
              <br />
              <Divider />
              <br />
              <Divider><h2>Application</h2></Divider>
              <br />
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
                <span><h3>{LectureDetail.application} / {LectureDetail.capacity}</h3></span>
                <span>{LectureDetail.applicationPeriod ? <h3 className="applicationPeriodMarker" style={{backgroundColor: 'green'}}>모집</h3>
                : <h3 className="applicationPeriodMarker" style={{backgroundColor: 'coral'}}>마감</h3>}</span>
              </div>
              <br />
              <Divider />
              <br />
              <Divider />
              {buttons}
              <Divider />
            </div>
          </Col>
        </Row>
      )
    } else {
      return (<div>Loading</div>)
    }
}

export default LectureDetailPage
