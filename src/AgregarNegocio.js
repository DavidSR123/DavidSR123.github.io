import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './MovDatos.css';

const libraries = ['places']; // Para usar la API de lugares si la necesitas
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: -34.397, // Latitud inicial
  lng: 150.644, // Longitud inicial
};

const AgregarNegocio = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    telefono: '',
    area: '', // Nuevo campo para el área
    direccion: '',
    latitud: '',
    longitud: '',
    imageUrl: '' // Campo para almacenar la URL de la imagen cargada
  });

  const [selected, setSelected] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Para previsualizar la imagen seleccionada

  const handleChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.id]: e.target.value,
    });
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelected({ lat, lng });
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCmta9KsVU-HVVwEYPSxvLb5EafwdsEz48`)
      .then(response => response.json())
      .then(data => {
        const direccion = data.results[0]?.formatted_address || 'Dirección no encontrada';
        setCompanyData(prevData => ({
          ...prevData,
          direccion,
          latitud: lat,
          longitud: lng,
        }));
      });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'logo_preset'); // Reemplazar con tu upload preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/derufjp1n/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setImagePreview(data.secure_url);
      setCompanyData(prevData => ({
        ...prevData,
        imageUrl: data.secure_url
      }));
    } catch (err) {
      console.error('Error al cargar la imagen:', err);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCmta9KsVU-HVVwEYPSxvLb5EafwdsEz48',
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <section className="full-width header-well">
      <div className="full-width header-well-icon">
        <i className="zmdi zmdi-balance"></i>
      </div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="full-width panel mdl-shadow--2dp">
            <div className="full-width panel-title bg-primary text-center tittles">
              Nuevo Negocio
            </div>
            <div className="full-width panel-content">
              <form>
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="name"
                      value={companyData.name}
                      onChange={handleChange}
                      placeholder="Nombre del negocio"
                    />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
                    <input
                      className="mdl-textfield__input"
                      type="tel"  /* Cambiado de text a tel */
                      id="numero"
                      value={companyData.telefono}
                      onChange={handleChange}
                      placeholder="Número del negocio"
                      pattern="[0-9]*" // Permitir solo números
                      inputMode="numeric" // Mostrar teclado numérico en dispositivos móviles
                    />
                  </div>

                  {/* Nuevo campo de selección para Área del Negocio */}
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
                    <select
                      className="mdl-textfield__input"
                      id="area"
                      value={companyData.area}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un área</option>
                      <option value="Restaurantes">Restaurantes</option>
                    </select>
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <div className="map-container" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={8}
                        center={center}
                        onClick={handleMapClick}
                      >
                        {selected && <Marker position={{ lat: selected.lat, lng: selected.lng }} />}
                      </GoogleMap>
                    </div>
                  </div>

                  <div className="mdl-cell mdl-cell--4-col">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="direccion"
                      value={companyData.direccion}
                      placeholder="Dirección del negocio"
                      readOnly
                    />
                  </div>
                  <div className="mdl-cell mdl-cell--4-col">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="latitud"
                      value={companyData.latitud}
                      placeholder="Latitud"
                      readOnly
                    />
                  </div>
                  <div className="mdl-cell mdl-cell--4-col">
                    <input
                      className="mdl-textfield__input"
                      type="text"
                      id="longitud"
                      value={companyData.longitud}
                      placeholder="Longitud"
                      readOnly
                    />
                  </div>
                  {/* Imagen y botón de carga */}
                  <div className="mdl-cell mdl-cell--12-col">
                    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Previsualización de imagen" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      ) : (
                        <div>Imagen no cargada</div>
                      )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgregarNegocio;