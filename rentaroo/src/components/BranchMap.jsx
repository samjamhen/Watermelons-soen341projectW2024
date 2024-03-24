import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const locations = [
  {
    id: 1,
    address: "Bd Roméro Vachon Nord, Dorval, QC",
    lat: 45.4549,
    lng: -73.75135,
  },
  {
    id: 2,
    address: "1005 Guy St, Montreal, QC",
    lat: 45.49327,
    lng: -73.57379,
  },
  {
    id: 3,
    address: "1555 Bd Curé-Labelle, Laval, QC",
    lat: 45.549950,
    lng: -73.757580
  }
];









const BranchMap = () => {
  const [openInfoWindow, setOpenInfoWindow] = React.useState(
    locations.map(() => false)
  );

  const handleMarkerClick = (index) => {
    const newOpenInfoWindow = [...openInfoWindow];
    newOpenInfoWindow[index] = true;
    setOpenInfoWindow(newOpenInfoWindow);
  };

  const handleInfoWindowClose = (index) => {
    const newOpenInfoWindow = [...openInfoWindow];
    newOpenInfoWindow[index] = false;
    setOpenInfoWindow(newOpenInfoWindow);
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 45.50, lng: -73.56 }}
          mapId={'514ee2444a491840'}
          streetViewControl = {false}
          mapTypeControl = {false}
        >
          {locations.map((location, index) => (
            <React.Fragment key={location.id}>
              <AdvancedMarker
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => handleMarkerClick(index)}
              >
                <Pin
                  background={"blue"}
                  borderColor={"white"}
                  glyphColor={"white"}
                />
              </AdvancedMarker>
              {openInfoWindow[index] && (
                <InfoWindow
                  position={{ lat: location.lat, lng: location.lng }}
                  onCloseClick={() => handleInfoWindowClose(index)}
                >
                  {location.address}
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default BranchMap;
