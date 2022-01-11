import React, { useEffect, useState } from 'react';
import { Button, Skeleton, Divider, Tooltip, message } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { editLecture } from "../../../_actions/lecture_actions";

function LectureApplicationButton(props) {
  const [ThisLecture, setThisLecture] = useState(props.ThisLecture)
  const [LectureApplicants, setLectureApplicants] = useState(0)
  const [AppliedLecture, setAppliedLecture] = useState(false)

  const StatusUpdate = () => {
    let updateVariable = {
      LectureId: ThisLecture._id,
      Capacity: ThisLecture.capacity,
      Applicants: LectureApplicants
    }
    axios.post('/api/lectures/updateApplicationStatus', updateVariable).then(response => {
      if (response.data.success) {
        console.log(ThisLecture)
        console.log(response.data)
      } else {
        message.error('Lecture Infomation Error! Please contact the site manager')
        window.location.reload();
      }
    })
  }

  const applicantsVariable = {
    LectureId: ThisLecture._id
  }
  const appliedVariable = {
    LectureId: ThisLecture._id,
    ApplicantInfo: localStorage.getItem('userId')
  }
  useEffect(() => {
    axios.post('/api/lectureApplication/getLectureApplicants', applicantsVariable).then(response => {
      if (response.data.success) {
        setLectureApplicants(response.data.Applicants)
      } else {
        message.error('Lecture Infomation Error! Please contact the site manager')
        props.history.push('/lectures')
      }
    })

    axios.post('/api/lectureApplication/getAppliedLecture', appliedVariable).then(response => {
      if (response.data.success) {
        setAppliedLecture(response.data.isApplied)
      } else {
        message.error('Lecture Infomation Error! Please contact the site manager')
        props.history.push('/lectures')
      }
    })

    StatusUpdate()
  }, [LectureApplicants, AppliedLecture])

  const onApply = () => {
    let applyVariable ={
      LectureId: ThisLecture._id,
      ApplicantInfo: localStorage.getItem('userId')
    }

    if (AppliedLecture) {
      axios.post('/api/lectureApplication/cancleApply', applyVariable).then(response => {
        if (response.data.success) {
          setLectureApplicants(LectureApplicants - 1)
          setAppliedLecture(!AppliedLecture)

          window.location.reload();
        } else {
          message.error('Application Error! Please contact the site manager')
          window.location.reload();
        }
      })
    } else {
      axios.post('/api/lectureApplication/toApply', applyVariable).then(response => {
        if (response.data.success) {
          setLectureApplicants(LectureApplicants + 1)
          setAppliedLecture(!AppliedLecture)

          window.location.reload();
        } else {
          message.error('Application Error! Please contact the site manager')
          window.location.reload();
        }
      })
    }
  }

  if (ThisLecture) {
    if (localStorage.getItem('userId') === ThisLecture.teacher._id) {
      return (
        <div>
          <h3>아직 미구현</h3>
        </div>
      )
    } else if (ThisLecture.applicationPeriod === true) {
      return (
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Divider><h2>Application</h2></Divider>
        <h2>{LectureApplicants}  /  {ThisLecture.capacity}</h2>
        <p />
        <Button style={{ height: 'auto', minWidth: '275px'}} onClick={onApply}>
          <h3 style={{ color: 'deepskyblue', fontWeight: 550, marginTop: '5px'  }}>모집 중</h3>
          {AppliedLecture ? <h3 style={{ marginBottom: '5px', fontWeight: 550  }}>신청 완료</h3>
           : <h3 style={{ marginBottom: '5px', fontWeight: 550  }}>신청하기</h3>}
        </Button>
        <Divider />
        <br />
        </div>
      )
    } else if (ThisLecture.applicationPeriod === false) {
      return (
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Divider><h2>Application</h2></Divider>
        <h2>{LectureApplicants}  /  {ThisLecture.capacity}</h2>
        <p />
        <Button style={{ height: 'auto', minWidth: '275px'}}>
          <h3 style={{ color: 'coral', fontWeight: 550, marginTop: '5px'  }}>모집 마감</h3>
          {AppliedLecture
          ? <h3 style={{ marginBottom: '5px', fontWeight: 550  }}>신청 완료</h3>
          : <h3 style={{ marginBottom: '5px', fontWeight: 550  }}>신청 불가</h3>}
        </Button>
        <Divider />
        <br />
        </div>
      )
    }
  } else {
    return (<div className="app" style={{ width: '50%', margin: 'auto' }}><Skeleton active /></div>)
  }
}

export default withRouter(LectureApplicationButton);
