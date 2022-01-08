import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { Card, Icon, Avatar, Col, Typography, Row, Button, Divider } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

function LecturePage() {
    const [Lecture, setLecture] = useState([])

    useEffect(() => {
      axios.get('/api/lectures/getLectures').then(response => {
        if (response.data.success) {
          setLecture(response.data.lectures)
        } else {
          alert('Lecture Infomation Error! Please contact the site manager')
        }
      })
    }, [])

    return (
      <div className="app" style={{ display: 'flex', width: '85%', margin: 'auto' }}>
        <Title level={2} style={{ marginTop: '25px' }}> Lectures </Title>
        <Divider />
        <br />
        <Row gutter={[32, 16]}>
          {Lecture.map((lectures, index) => {
            return <Col lg={6} md={8} xs={24}>
              <a href={`/lectures/${lectures._id}`}>
                <div style={{ position: 'relative'}}>
                  <img style={{ width: '100%' }} src={`http://localhost:5000/${lectures.filePath}`} />
                </div>
                <br />
                <span><h2>{lectures.title}</h2></span>
              </a>
              <br />
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
                <Meta avatar={<Avatar src={lectures.teacher.Image} />} title={lectures.teacher.name} description="" />
                {lectures.applicationPeriod ? <h3 className="applicationPeriodMarker" style={{backgroundColor: 'green'}}>모집</h3>
                 : <h3 className="applicationPeriodMarker" style={{backgroundColor: 'coral'}}>마감</h3>}
              </div>
              <br />
            </Col>
          })}
        </Row>
        <br />
        <Divider />
        <br />
        <Divider />
        <a href="/lectures/register">
          <Button type="default" style={{ minWidth: '100%' }}>
            Register new lecture
          </Button>
        </a>
        <Divider />
      </div>
    )
}

export default withRouter(LecturePage);
