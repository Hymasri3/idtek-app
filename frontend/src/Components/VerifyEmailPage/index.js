import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router';

const VerifyEmailPage = () => {
  const [validUrl, setValidUrl] = useState(true)
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/users/${param.id}/verify/${param.token}`;
        const { data } = await fetch(url, {
          method: 'GET'
        })
        console.log("Data----", data)
        setValidUrl(true)
      }
      catch (error) {
        console.log(error)
        setValidUrl(false)
      }
    };
    verifyEmailUrl()
  }, [param])
  return (<Fragment>
    {validUrl ? <div><h1>Success</h1><Link to="/login">Login</Link></div> : <div><h1>Failure</h1></div>}
  </Fragment>)
}

export default VerifyEmailPage;
