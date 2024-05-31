import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

const About = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md="6" className="mb-4">
          <img
            src="https://img.freepik.com/free-vector/male-programmer-working-computer-office-wall-with-hanging-reminder-stickers-developer-creating-new-software-interface-coding-programming-system-administrator-designer-character_575670-1159.jpg?w=1060&t=st=1716559026~exp=1716559626~hmac=814ef4cd81cfa5716a9663794ae89fd943a28bb0678631c3be90a3bae1b74d1d"
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
