import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

const About = () => {
  return (
    <Container>
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
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              fringilla magna id quam accumsan, vel posuere nisi ultricies.
              Donec vel lorem et ante viverra aliquam. Ut ac metus ac purus
              aliquam aliquet in ac justo. Sed at justo vel purus eleifend
              tristique. Nullam feugiat dapibus risus, non laoreet mi
              sollicitudin non. Mauris vel malesuada sapien. Phasellus vehicula
              magna nec mauris efficitur, vel tempor justo consequat. Proin sed
              ante vel nunc ullamcorper aliquam. Proin sit amet mi id libero
              rutrum efficitur.
            </p>
            <button className="btn my-btn">Learn More</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
