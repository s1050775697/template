export interface CityBoundary {
  name: string;
  path: Array<{ longitude: number; latitude: number }>;
  center: { longitude: number; latitude: number };
}
export const fetchCityBoundaries = async (cityName: string) => {
  // Try to get administrative boundary specifically

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    cityName
  )}&format=geojson&polygon_geojson=1&featuretype=city&type=administrative`;

  try {
    const response = await fetch(url);
    const geojson = await response.json();

    // Check if features exist
    if (!geojson.features || geojson.features.length === 0) {
      console.warn(`No boundary data found for ${cityName}`);
      return null;
    }

    // Find the first feature that has a Polygon or MultiPolygon geometry
    const feature = geojson.features.find(
      (f: any) =>
        f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon"
    );

    if (!feature) {
      console.warn(`No polygon boundary found for ${cityName}`);
      return null;
    }

    const geometryType = feature.geometry.type;
    let coordinates = [];

    switch (geometryType) {
      case "Polygon":
        coordinates = feature.geometry.coordinates[0];
        break;
      case "MultiPolygon":
        // Take the largest polygon from multipolygon
        coordinates = feature.geometry.coordinates.reduce(
          (largest: any[], current: any[]) =>
            current[0].length > largest[0].length ? current : largest
        )[0];
        break;
      default:
        console.warn(
          `Unsupported geometry type for ${cityName}: ${geometryType}`
        );
        return null;
    }

    // Convert to {longitude, latitude} format and reduce points for better performance
    const boundaryPoints = coordinates
      .filter((_: any, index: number) => index % 3 === 0) // Take every 3rd point to reduce complexity
      .map(([lon, lat]: number[]) => ({
        longitude: lon,
        latitude: lat,
      }));

    return {
      name: cityName,
      path: boundaryPoints,
      center: {
        longitude: feature.bbox ? feature.bbox[0] : coordinates[0][0],
        latitude: feature.bbox ? feature.bbox[1] : coordinates[0][1],
      },
    };
  } catch (error) {
    console.error(`Error fetching boundaries for ${cityName}:`, error);
    return null;
  }
};
