import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import mineralService from '../services/MineralService';

const MineralDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mineral, setMineral] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundMineral = mineralService.getMineralById(id);
        if (foundMineral) {
            setMineral(foundMineral);
        } else {
            navigate('/');
        }
        setLoading(false);
    }, [id, navigate]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <h2>Cargando...</h2>
            </Container>
        );
    }

    if (!mineral) {
        return null;
    }

    return (
        <Container className="py-4">
            <Link to="/" className="btn btn-outline-primary mb-4 d-inline-flex align-items-center">
                <FaArrowLeft className="me-2" /> Volver a la colección
            </Link>
            
            <Row className="mb-4 g-4">
                <Col md={6}>
                    {mineral.images && mineral.images.length > 0 ? (
                        <Carousel className="mineral-detail-carousel shadow">
                            {mineral.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`${mineral.name} - Imagen ${index + 1}`}
                                        style={{ height: '400px', objectFit: 'contain', backgroundColor: '#1a1a2a' }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="no-image-placeholder rounded-3 shadow" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Sin imágenes disponibles</span>
                        </div>
                    )}
                </Col>
                
                <Col md={6}>
                    <Card 
                        className="mineral-detail-card h-100 shadow"
                        style={{ border: `2px solid ${mineral.color}` }}
                    >
                        <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <Card.Title className="fs-2 mineral-title">{mineral.name}</Card.Title>
                                </div>
                                <Link to={`/edit/${mineral.id}`} className="btn btn-warning d-flex align-items-center">
                                    <FaEdit className="me-2" /> Editar
                                </Link>
                            </div>
                            
                            <div className="mineral-properties fs-5 mb-4">
                                <Row className="mb-3">
                                    <Col xs={4}><strong>Color:</strong></Col>
                                    <Col>{mineral.color}</Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={4}><strong>Origen:</strong></Col>
                                    <Col>{mineral.origin}</Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MineralDetail;