import React from 'react';
import { Link } from 'react-router-dom';

import user from '../../assets/images/user.png';
import lock from '../../assets/images/lock.png';
import login_bg from '../../assets/images/login_bg.png';
import message from '../../assets/images/message.png';
import { useGetContentQuery } from '../../redux/api';
import { useEffect } from 'react';
import { useState } from 'react';

const Registerpage = () => {
  const [content, setContent] = useState('');
  const { data, isLoading, isError } = useGetContentQuery();

  const contentForEdit = data?.data;

  useEffect(() => {
    const aboutUs = contentForEdit?.filter(
      (data) => data.content === 'About Us'
    )?.[0]?.editorData;
    if (contentForEdit) setContent(aboutUs);
  }, [contentForEdit]);
  return (
    <div className="maincontent">
      <div className="pageContent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mycard">
                <div className="card-body p-md-5 p-3">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="text-center fs-36 fw-700 mb-4">
                        About Us
                      </div>
                      <div className="cmsCnt pt-4">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
