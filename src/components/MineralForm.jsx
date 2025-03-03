import { useState, useEffect } from 'react';
import { Container, Form, Button, Image, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import mineralService from '../services/MineralService';

const MineralForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        origin: '',
        images: []
    });

    useEffect(() => {
        if (id) {
            const mineral = mineralService.getMineralById(id);
            if (mineral) {
                setFormData(mineral);
            }
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then(images => {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...images]
            }));
        });
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            mineralService.updateMineral(id, formData);
        } else {
            mineralService.addMineral(formData);
        }
        navigate('/');
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4 mineral-title">{id ? 'Editar Mineral' : 'Añadir Nuevo Mineral'}</h1>
            <Form onSubmit={handleSubmit} className="mineral-form shadow">
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="py-2"
                    />
                </Form.Group>
                
                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Color</Form.Label>
                            <Form.Control
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                required
                                className="py-2"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Origen</Form.Label>
                            <Form.Control
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleInputChange}
                                required
                                className="py-2"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Imágenes</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="mb-3 py-2"
                    />
                    <div className="d-flex flex-wrap gap-3 mt-3">
                        {formData.images.map((image, index) => (
                            <div key={index} className="position-relative">
                                <Image
                                    src={image}
                                    alt={`Mineral ${index + 1}`}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    thumbnail
                                    className="shadow-sm"
                                />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute top-0 end-0 rounded-circle p-1"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>
                </Form.Group>
                
                <div className="d-flex gap-3 pt-3 border-top">
                    <Button variant="primary" type="submit" className="px-4 py-2">
                        {id ? 'Guardar Cambios' : 'Añadir Mineral'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/')} className="px-4 py-2">
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default MineralForm;