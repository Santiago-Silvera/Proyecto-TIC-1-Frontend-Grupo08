import React, { useState } from 'react';
import "./Sucursales.css"

// Not implemented

const AboutUs = () => {

    const [sucursales, setSucursales] = useState([]); // Items en carlera (Se hace request al backend)
    const [errores, setErrores] = useState(null); // Si la respuesta es un error

    const fetchSucursalesData = async () => {
        try { // Si no da error
            const response = await fetch(''); // Hay que poner a donde se hace request
            if (!response.ok) throw new Error('Could not fetch movies data'); // El error
            const data = await response.json() // Se guarda el json, solo se necesita los nombres
            setSucursales(data); // Se guarda el json en data
        } catch (err) { // Si dio error
            console.error(err);
            setErrores('Failed to load items');
        }
    };

    return (
        <div>
            <h1>Donde Estamos</h1>
            {fetchSucursalesData}
            <table> {/* Los items van a una lista que se puede scrollear*/}
                <thead>
                <tr>
                    <th>Localidad</th>
                    <th>Cantidad de Salas</th>
                </tr>
                </thead>
                <tbody>
                {sucursales.map((item, index) => (
                    <tr key={index} className="list-item">
                        <td>{item.name}</td>  {//Ver nombres bien
                    }<td>{item.salas}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AboutUs;