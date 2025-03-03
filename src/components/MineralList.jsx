import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaThLarge, FaList, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import mineralService from '../services/MineralService';

// Función para traducir colores del español al inglés
const translateColorToEnglish = (spanishColor) => {
    const colorMap = {
        'rojo': 'red',
        'azul': 'blue',
        'verde': 'green',
        'amarillo': 'yellow',
        'negro': 'black',
        'blanco': 'white',
        'gris': 'gray',
        'naranja': 'orange',
        'morado': 'purple',
        'violeta': 'violet',
        'rosa': 'pink',
        'marrón': 'brown',
        'dorado': 'gold',
        'plateado': 'silver',
        'turquesa': 'turquoise',
        'beige': 'beige',
        'cian': 'cyan',
        'magenta': 'magenta',
        'oliva': 'olive',
        'coral': 'coral',
        'índigo': 'indigo',
        'lavanda': 'lavender',
        'lila': 'lilac',
        'carmesí': 'crimson',
        'esmeralda': 'emerald',
        'zafiro': 'sapphire',
        'rubí': 'ruby',
        'ámbar': 'amber',
        'jade': 'jade',
        'ocre': 'ochre',
        'burdeos': 'burgundy',
        'fucsia': 'fuchsia',
        'aguamarina': 'aquamarine',
        'marfil': 'ivory',
        'crema': 'cream'
    };
    
    // Convertir a minúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
    const lowerCaseColor = spanishColor.toLowerCase();
    
    // Buscar coincidencia exacta
    if (colorMap[lowerCaseColor]) {
        return colorMap[lowerCaseColor];
    }
    
    // Buscar coincidencia parcial
    for (const [spanish, english] of Object.entries(colorMap)) {
        if (lowerCaseColor.includes(spanish)) {
            return english;
        }
    }
    
    // Si no hay coincidencia, devolver el color original
    return spanishColor;
};

// Función para convertir nombres de colores a valores RGB
const getColorRGB = (colorName) => {
    // Mapa de colores básicos a valores RGB
    const colorMap = {
        'red': '255, 0, 0',
        'blue': '0, 0, 255',
        'green': '0, 128, 0',
        'yellow': '255, 255, 0',
        'black': '0, 0, 0',
        'white': '255, 255, 255',
        'gray': '128, 128, 128',
        'orange': '255, 165, 0',
        'purple': '128, 0, 128',
        'violet': '238, 130, 238',
        'pink': '255, 192, 203',
        'brown': '165, 42, 42',
        'gold': '255, 215, 0',
        'silver': '192, 192, 192',
        'turquoise': '64, 224, 208',
        'beige': '245, 245, 220',
        'cyan': '0, 255, 255',
        'magenta': '255, 0, 255',
        'olive': '128, 128, 0',
        'coral': '255, 127, 80',
        'indigo': '75, 0, 130',
        'lavender': '230, 230, 250',
        'lilac': '200, 162, 200',
        'crimson': '220, 20, 60',
        'emerald': '80, 200, 120',
        'sapphire': '15, 82, 186',
        'ruby': '224, 17, 95',
        'amber': '255, 191, 0',
        'jade': '0, 168, 107',
        'ochre': '204, 119, 34',
        'burgundy': '128, 0, 32',
        'fuchsia': '255, 0, 255',
        'aquamarine': '127, 255, 212',
        'ivory': '255, 255, 240',
        'cream': '255, 253, 208'
    };
    
    // Convertir a minúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
    const lowerCaseColor = colorName.toLowerCase();
    
    // Devolver el valor RGB si existe en el mapa, o un valor predeterminado
    return colorMap[lowerCaseColor] || '128, 128, 128';
};

const MineralList = () => {
    const [minerals, setMinerals] = useState([]);
    const [viewMode, setViewMode] = useState('card'); // 'card' o 'list'
    const [selectedMineral, setSelectedMineral] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        // Cargar minerales al montar el componente
        const loadedMinerals = mineralService.getAllMinerals();
        setMinerals(loadedMinerals);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este mineral?')) {
            const success = mineralService.deleteMineral(id);
            if (success) {
                setMinerals(minerals.filter(mineral => mineral.id !== id));
            }
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            // Si ya estamos ordenando por este campo, cambiamos la dirección
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Si es un nuevo campo, ordenamos ascendente por defecto
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtrar minerales según el término de búsqueda
    const filteredMinerals = minerals.filter(mineral => 
        mineral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mineral.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mineral.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ordenar minerales según el campo y dirección seleccionados
    const sortedMinerals = [...filteredMinerals].sort((a, b) => {
        if (sortDirection === 'asc') {
            return a[sortField].localeCompare(b[sortField]);
        } else {
            return b[sortField].localeCompare(a[sortField]);
        }
    });

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col md={6} className="d-flex align-items-center gap-3">
                    <Link to="/add" className="btn btn-primary d-flex align-items-center" style={{ width: 'fit-content' }}>
                        <FaPlus className="me-2" /> Añadir
                    </Link>
                    
                    <div className="search-container" style={{ width: '50%' }}>
                        <InputGroup style={{ height: '38px' }}>
                            <InputGroup.Text><FaSearch /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearch}
                                style={{ padding: '0.25rem 0.75rem' }}
                            />
                        </InputGroup>
                    </div>
                </Col>
                
                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Selector de tarjetas y lista */}
                        <ButtonGroup>
                            <Button 
                                variant={viewMode === 'card' ? 'primary' : 'outline-primary'} 
                                onClick={() => setViewMode('card')}
                                className="d-flex align-items-center"
                            >
                                <FaThLarge className="me-2" /> Tarjetas
                            </Button>
                            <Button 
                                variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                                onClick={() => setViewMode('list')}
                                className="d-flex align-items-center"
                            >
                                <FaList className="me-2" /> Lista
                            </Button>
                        </ButtonGroup>
                        
                        {/* Espacio entre grupos de botones */}
                        <div className="mx-3" style={{ width: '1cm' }}></div>
                        
                        {/* Ordenar por nombre o color */}
                        <ButtonGroup>
                            <Button 
                                variant={sortField === 'name' ? 'info' : 'outline-info'} 
                                onClick={() => handleSort('name')}
                                className="d-flex align-items-center"
                            >
                                Nombre {sortField === 'name' && (
                                    sortDirection === 'asc' ? <FaSortAlphaDown className="ms-1" /> : <FaSortAlphaUp className="ms-1" />
                                )}
                            </Button>
                            <Button 
                                variant={sortField === 'color' ? 'info' : 'outline-info'} 
                                onClick={() => handleSort('color')}
                                className="d-flex align-items-center"
                            >
                                Color {sortField === 'color' && (
                                    sortDirection === 'asc' ? <FaSortAlphaDown className="ms-1" /> : <FaSortAlphaUp className="ms-1" />
                                )}
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>

            {sortedMinerals.length === 0 ? (
                <div className="text-center py-5 my-4 bg-dark bg-opacity-25 rounded-3">
                    {searchTerm ? (
                        <>
                            <h3 className="mb-3">No se encontraron minerales</h3>
                            <p className="mb-4">No hay resultados para "{searchTerm}"</p>
                            <Button variant="outline-light" onClick={() => setSearchTerm('')}>
                                Limpiar búsqueda
                            </Button>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-3">No hay minerales en tu colección</h3>
                            <p className="mb-4">¡Comienza añadiendo tu primer mineral!</p>
                            <Link to="/add" className="btn btn-primary px-4 py-2">
                                <FaPlus className="me-2" /> Añadir
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                    {selectedMineral && viewMode === 'list' && (
                        <div className="mb-4">
                            <Button 
                                variant="outline-secondary" 
                                size="sm" 
                                className="mb-3"
                                onClick={() => setSelectedMineral(null)}
                            >
                                Volver a la lista
                            </Button>
                            <Card 
                                className="mineral-card shadow"
                                style={{ border: `2px solid ${selectedMineral.color}` }}
                            >
                                <Row className="g-0">
                                    <Col md={4}>
                                        {selectedMineral.images && selectedMineral.images.length > 0 ? (
                                            <img
                                                src={selectedMineral.images[0]}
                                                alt={selectedMineral.name}
                                                className="img-fluid rounded-start mineral-image"
                                                style={{ height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="no-image-placeholder h-100 rounded-start">
                                                <span>Sin imagen</span>
                                            </div>
                                        )}
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title className="fs-4 fw-bold">{selectedMineral.name}</Card.Title>
                                            <div className="mineral-properties my-3">
                                                <p><strong>Color:</strong> {selectedMineral.color}</p>
                                                <p><strong>Origen:</strong> {selectedMineral.origin}</p>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                                                <Link to={`/view/${selectedMineral.id}`} className="btn btn-info">
                                                    Ver Detalles Completos
                                                </Link>
                                                <div>
                                                    <Link to={`/edit/${selectedMineral.id}`} className="btn btn-warning me-2">
                                                        <FaEdit className="me-1" /> Editar
                                                    </Link>
                                                    <Button variant="danger" onClick={() => handleDelete(selectedMineral.id)}>
                                                        <FaTrash className="me-1" /> Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    )}
                    
                    {viewMode === 'card' && !selectedMineral && (
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                            {sortedMinerals.map(mineral => (
                                <Col key={mineral.id}>
                                    <Card 
                                        className="mineral-card h-100 shadow" 
                                        style={{ border: `2px solid ${translateColorToEnglish(mineral.color)}` }}
                                    >
                                        {mineral.images && mineral.images.length > 0 ? (
                                            <Card.Img 
                                                variant="top" 
                                                src={mineral.images[0]} 
                                                alt={mineral.name}
                                                className="mineral-image"
                                            />
                                        ) : (
                                            <div className="no-image-placeholder">
                                                <span>Sin imagen</span>
                                            </div>
                                        )}
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="mb-3 fs-5 fw-bold">{mineral.name}</Card.Title>
                                            <div className="mineral-properties mb-auto">
                                                <p><strong>Color:</strong> {mineral.color}</p>
                                                <p><strong>Origen:</strong> {mineral.origin}</p>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                                                <Link to={`/view/${mineral.id}`} className="btn btn-info btn-sm">
                                                    Ver Detalles
                                                </Link>
                                                <div>
                                                    <Link to={`/edit/${mineral.id}`} className="btn btn-warning btn-sm me-2">
                                                        <FaEdit />
                                                    </Link>
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(mineral.id)}>
                                                        <FaTrash />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                    
                    {viewMode === 'list' && !selectedMineral && (
                        <div className="mineral-list-view">
                            <Table responsive hover className="mineral-table" style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                            Nombre {sortField === 'name' && (
                                                sortDirection === 'asc' ? <FaSortAlphaDown className="ms-1" /> : <FaSortAlphaUp className="ms-1" />
                                            )}
                                        </th>
                                        <th onClick={() => handleSort('color')} style={{ cursor: 'pointer' }}>
                                            Color {sortField === 'color' && (
                                                sortDirection === 'asc' ? <FaSortAlphaDown className="ms-1" /> : <FaSortAlphaUp className="ms-1" />
                                            )}
                                        </th>
                                        <th>Origen</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedMinerals.map(mineral => (
                                        <tr 
                                            key={mineral.id} 
                                            onClick={() => setSelectedMineral(mineral)} 
                                            style={{ 
                                                cursor: 'pointer',
                                                backgroundColor: `rgba(${getColorRGB(translateColorToEnglish(mineral.color))}, 0.1)`,
                                                color: '#333333',
                                                fontSize: '0.95rem',
                                                fontWeight: 'bold',
                                                lineHeight: '1',
                                                height: '66.7%' // Reduced by one-third
                                            }}
                                        >
                                            <td style={{
                                                backgroundColor: `rgba(${getColorRGB(translateColorToEnglish(mineral.color))}, 0.1)`,
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                padding: '4px 8px' // Reduced padding to decrease height
                                            }}>{mineral.name}</td>
                                            <td style={{
                                                backgroundColor: `rgba(${getColorRGB(translateColorToEnglish(mineral.color))}, 0.1)`,
                                                color: '#000000',
                                                borderRadius: '4px',
                                                textAlign: 'left',
                                                fontWeight: 'bold',
                                                padding: '4px 8px' // Reduced padding to decrease height
                                            }}>{mineral.color}</td>
                                            <td style={{
                                                backgroundColor: `rgba(${getColorRGB(translateColorToEnglish(mineral.color))}, 0.1)`,
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                padding: '4px 8px' // Reduced padding to decrease height
                                            }}>{mineral.origin}</td>
                                            <td style={{
                                                backgroundColor: `rgba(${getColorRGB(translateColorToEnglish(mineral.color))}, 0.1)`,
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                padding: '4px 8px' // Reduced padding to decrease height
                                            }}>
                                                <div className="d-flex">
                                                    <Link to={`/view/${mineral.id}`} className="btn btn-info btn-sm me-2">
                                                        Ver
                                                    </Link>
                                                    <Link to={`/edit/${mineral.id}`} className="btn btn-warning btn-sm me-2">
                                                        <FaEdit />
                                                    </Link>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(mineral.id);
                                                        }}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default MineralList;