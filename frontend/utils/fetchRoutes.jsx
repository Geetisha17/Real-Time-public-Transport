import axios from 'axios';

export const fetchRoutes = async(from,to)=>{

    try{
        const res = await axios.get(`https://localhost:8080/api/route`,{
            params:{from, to},
        });

        const data = res.data;
        if(data.routes.length === 0)
            return null;

        const bestRoute = data.routes[0];
        const polyline = bestRoute.overview_polyline.points;
        const duration = bestRoute.legs[0].duration.text;
        const steps = bestRoute.legs[0].steps;
    
        return { polyline, duration, steps };
    }
    catch(err)
    {
        console.log(err.message);
        return null;
    }
}