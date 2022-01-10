import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function LectureApplicationButton(props) {
  const [ThisLecture, setThisLecture] = useState(props.ThisLecture)
  const [LectureApplicants, setLectureApplicants] = useState(0)
  const [AppliedLecture, setAppliedLecture] = useState(false)

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
        alert('Lecture Infomation Error! Please contact the site manager')
        props.history.push('/lectures')
      }
    })

    axios.post('/api/lectureApplication/getAppliedLecture', appliedVariable).then(response => {
      if (response.data.success) {
        setAppliedLecture(response.data.isApplied)
      } else {
        alert('Lecture Infomation Error! Please contact the site manager')
        props.history.push('/lectures')
      }
    })
  }, [])

  const onApply = () => {
    let applyVariable ={
      LectureId: ThisLecture._id,
      ApplicantInfo: localStorage.getItem('userId')
    }

    const StatusUpdate = () => {
      let updateVariable ={
        LectureId: ThisLecture._id,
        newApplicants: LectureApplicants,
        Capacity: ThisLecture.capacity
      }

      axios.post('/api/lectures/updateApplicationStatus', updateVariable).then(response => {
        if (response.data.success) {

        } else {
          alert('Lecture Infomation Error! Please contact the site manager')
          props.history.push(`/lectures/${ThisLecture._id}`)
        }
      })
    }

    if (AppliedLecture) {
      axios.post('/api/lectureApplication/cancleApply', applyVariable).then(response => {
        if (response.data.success) {
          setLectureApplicants(LectureApplicants - 1)
          setAppliedLecture(!AppliedLecture)

          StatusUpdate()
        } else {
          alert('Application Error! Please contact the site manager')
          props.history.push(`/lectures/${ThisLecture._id}`)
        }
      })
    } else {
      axios.post('/api/lectureApplication/toApply', applyVariable).then(response => {
        if (response.data.success) {
          setLectureApplicants(LectureApplicants + 1)
          setAppliedLecture(!AppliedLecture)

          StatusUpdate()
        } else {
          alert('Application Error! Please contact the site manager')
          props.history.push(`/lectures/${ThisLecture._id}`)
        }
      })
    }
  }

  if (ThisLecture) {
    if (ThisLecture.applicationPeriod === true) {
      return (
        <div>
        <Divider><h2>Application</h2></Divider>
        <br />
        <div>
          <Button style={{ height: 'auto' }} onClick={onApply}>
            <h4 style={{ color: 'deepskyblue' }}>{LectureApplicants} Applicants</h4>
            {AppliedLecture ? <h3 style={{ marginBottom: '5px' }}>Applied</h3> : <h3 style={{ marginBottom: '5px' }}>Apply</h3>}
          </Button>
        </div>
        <br />
        <Divider />
        </div>
      )
    } else if (localStorage.getItem('userId') === ThisLecture.teacher._id) {
      return (
        <div>
          <h3>아직 미구현</h3>
        </div>
      )
    } else {
      return (
        <div>
        <Divider><h2>Application</h2></Divider>
        <br />
        <div>
          <Button style={{ height: 'auto', color: 'gray', backgroundColor: 'gray'}}>
            <h4 style={{ color: 'gray' }}>{LectureApplicants} Applicants</h4>
            <h3 style={{ marginBottom: '5px', color: 'gray' }}>Application closed</h3>
          </Button>
        </div>
        <br />
        <Divider />
        </div>
      )
    }
  } else {
    return (<div className="app" style={{ width: '50%', margin: 'auto' }}><Skeleton active /></div>)
  }
}

export default withRouter(LectureApplicationButton);
