import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <>
      <Container className="pt-5 ">
        <Row className="mt-5">
          <Col md="6" className="mb-4">
            <img
              src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg?w=740&t=st=1717422615~exp=1717423215~hmac=504473763b68549c27f4be8ab1a146d5975350fc77ebdb321c43f99dd887b420"
              alt="About Us"
              className="img-fluid"
            />
          </Col>
          <Col md="6" className="mb-4 mt-4">
            <div>
              <h2 className="mb-4">About Us</h2>
              <p className="fs-5 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                fringilla magna id quam accumsan, vel posuere nisi ultricies.
                Donec vel lorem et ante viverra aliquam. Ut ac metus ac purus
                aliquam aliquet in ac justo. Sed at justo vel purus eleifend
                tristique. Nullam feugiat dapibus risus, non laoreet mi
                sollicitudin non. Mauris vel malesuada sapien. Phasellus
                vehicula magna nec mauris efficitur, vel tempor justo consequat.
                .
              </p>
              <button
                type="button"
                className="btn bsb-btn-xl btn-outline-primary rounded-pill px-4"
              >
                Learn More
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <!-- About 2 - Bootstrap Brain Component --> */}
      <section className="py-3 py-md-5">
        <Container>
          <Row className="gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <Col lg="6">
              <Row className="justify-content-xl-center">
                <Col xl="10">
                  <h2 className="mb-3">Why Choose Us?</h2>
                  <p className="lead fs-4 mb-3 mb-xl-5">
                    With years of experience and deep industry knowledge, we
                    have a proven track record of success and are constantly
                    pushing ourselves to stay ahead of the curve.
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 text-primary">
                      <FontAwesomeIcon className="fa-xl" icon={faCheckCircle} />
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        Our evolution procedure is super intelligent.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3 text-primary">
                      <FontAwesomeIcon className="fa-xl" icon={faCheckCircle} />
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        We deliver services beyond expectations.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-4 mb-xl-5">
                    <div className="me-3 text-primary">
                      <FontAwesomeIcon className="fa-xl" icon={faCheckCircle} />
                    </div>
                    <div>
                      <p className="fs-5 m-0">
                        Let's hire us to reach your objectives.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn bsb-btn-xl btn-outline-primary rounded-pill px-4 p-2"
                  >
                    Connect Now
                  </button>
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <img
                className="img-fluid rounded"
                loading="lazy"
                src="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?t=st=1717652326~exp=1717655926~hmac=cbd4bd8fccac6b2b5bac32929f687db352e969f8fc3888bd23b3b7ba31218b40&w=740"
                alt="About 2"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
