import axios from "axios";

export const fetchRoutes = async (from, to, mode = 'transit', transit_mode = '') => {
    try {
      console.log("Fetching routes", from, "to:", to, "mode:", mode, "transit_mode:", transit_mode);
  
      const res = await axios.get(
        'https://8080-geetisha17-realtimepubl-je8j9g2yf61.ws-us119.gitpod.io/api/route',
        {
          params: { from, to, mode, transit_mode },
        }
      );
  
      const data = res.data;
  
      if (!data.routes || data.routes.length === 0) {
        console.log("NO ROUTE FOUND");
        return null;
      }
  
      const bestRoute = data.routes[0];
  
      const polyline = bestRoute?.overview_polyline?.points || '';
      const duration = bestRoute?.legs?.[0]?.duration?.text || 'Unknown';
      const steps = bestRoute?.legs?.[0]?.steps || [];
  
      return { polyline, duration, steps };
    } catch (err) {
      console.log("ERROR FETCHING ROUTE:", err.message);
      return null;
    }
  };