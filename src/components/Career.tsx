import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (HSC - XII)</h4>
                <h5>SGB Defence Services Academy</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed Class XII Board Examination with 86.17%. Built a solid foundation in Physics, Chemistry, and Advanced Mathematics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons & Cloud Summit</h4>
                <h5>Smart India Hackathon & AWS</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Qualified internally for Smart India Hackathon (SIH) 2025 among top teams to represent at national level. Participated in the AWS Builder Summit 2026, gaining insights into modern cloud architectures and scalable deployments.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>G H Raisoni College of Engineering, Nagpur</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              CGPA: 8.49/10. Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Computer Networks, DBMS, Operating Systems, System Design. Expected Graduation 2027.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
