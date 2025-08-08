import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center"></h2>

            {/* Stat cards */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow-sm text-white bg-primary">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title>Total Orders</Card.Title>
                                    <h3>152</h3>
                                </div>
                                <FaShoppingCart size={40} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm text-white bg-success">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title>Total Revenue</Card.Title>
                                    <h3>Rs 20,00,000</h3>
                                </div>
                                <FaMoneyBillWave size={40} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm text-white bg-warning">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title>Users</Card.Title>
                                    <h3>3</h3>
                                </div>
                                <FaUsers size={40} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>Recent Activity</Card.Title>
                    <p>No recent activity. (Coming Soon!)</p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;
