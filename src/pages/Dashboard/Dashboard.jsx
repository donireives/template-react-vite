import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserData } from '@/utils/storage';
import { useTheme } from '@/hooks/useTheme';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MainLayout from '@/components/layout/MainLayout';
import { useThemeClass } from '@/hooks/useThemeClass';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const userData = getUserData();
    const { theme: currentTheme } = useTheme();
    const { getTextClass, getTextMutedClass } = useThemeClass();

    const mapTiles = {
        dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    };

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData) return null;

    return (
        <MainLayout>
            <div className={`rounded shadow ${currentTheme === 'dark' ? 'bg-darker' : 'bg-white'}`}>
                {/* Map Header */}
                <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-secondary">
                    <div className="d-flex gap-3">
                        <button className="btn btn-primary">ACTIVITY</button>
                        <button className="btn btn-secondary">MAPS</button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className={getTextClass()}>Tracking</div>
                        <button className="btn btn-secondary">FILTER</button>
                        <div className="d-flex align-items-center gap-2">
                            <span className={getTextClass()}>Active Users</span>
                            <span className="badge bg-secondary">1</span>
                        </div>
                    </div>
                </div>

                {/* Map Container */}
                <div className="position-relative" style={{height: '80vh'}}>
                    <div className="position-absolute top-0 start-0 mt-4 ms-4 z-3 d-flex gap-2">
                        <button className="btn btn-primary">Map</button>
                        <button className="btn btn-secondary">Satellite</button>
                    </div>
                    
                    <MapContainer 
                        center={[-6.2088, 106.8456]} 
                        zoom={5} 
                        className="h-100 w-100"
                        zoomControl={false}
                    >
                        <TileLayer
                            url={currentTheme === 'dark' ? mapTiles.dark : mapTiles.light}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <Marker position={[-6.2088, 106.8456]}>
                            <Popup>Test Location</Popup>
                        </Marker>
                    </MapContainer>

                    {/* Active Users Sidebar */}
                    <div className="position-absolute top-0 end-0 mt-5 me-4 p-4 rounded shadow-lg" 
                        style={{
                            width: '16rem',
                            zIndex: 1000,
                            backgroundColor: currentTheme === 'dark' ? '#1a1f2c' : 'white'
                        }}>
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-secondary rounded-circle" style={{width: '32px', height: '32px'}}></div>
                            <div>
                                <div className={getTextClass()}>Test2</div>
                                <div className={getTextMutedClass()}>
                                    Last Login: 2025-01-10 11:25:14
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard; 